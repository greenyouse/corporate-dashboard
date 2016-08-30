(ns pullscript.core
  (:require [cheshire.core :as json]
            [clj-time.coerce :as tc]
            [clojure.data.csv :as csv]
            [clojure.string :as s]
            [clojure.walk :as walk]
            [namejen.names :as name])
  (:use [clojure.java.io :as io])
  (:import [java.io.Writer]))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; office data (for geospatial)

(def stadiums
  "MLB American League Stadiums" ; go Twins!
  #{{:team "Angels" :stadium "Angel Staium of Anaheim" :coords {:lat 33.800278 :lng -117.882778}}
    {:team "Oriels" :stadium "Oriole Park at Camden Yards" :coords {:lat 39.283889 :lng -76.621667}}
    {:team "Red Sox" :stadium "Fenway Park" :coords {:lat 42.346389 :lng -71.0975}}
    {:team "White Sox" :stadium "Wrigley Field" :coords {:lat 41.948333 :lng -87.655556}}
    {:team "Indians" :stadium "Progressive Field" :coords {:lat 41.495833 :lng -81.685278}}
    {:team "Tigers" :stadium "Comerica Park" :coords {:lat 42.339167 :lng -83.048611}}
    {:team "Royals" :stadium "Kauffman Stadium" :coords {:lat 39.051389 :lng -94.480556}}
    {:team "Astros" :stadium "Minute Maid Park" :coords {:lat 29.756944 :lng -95.355556}}
    {:team "Twins" :stadium "Target Field" :coords {:lat 44.981667 :lng -93.278333}}
    {:team "Athletics" :stadium "Oakland Coliseum" :coords {:lat 37.751667 :lng -122.200556}}
    {:team "Mariners" :stadium "SafeCo Field" :coords {:lat 47.591 :lng -122.333}}
    {:team "Rays" :stadium "Tropicana Field" :coords {:lat 27.768333 :lng -82.653333}}
    {:team "Rangers" :stadium "Globe Life Park in Arlington" :coords {:lat 32.751389 :lng -97.082778}}
    {:team "Blue Jays" :stadium "Rogers Centre" :coords {:lat 43.641389 :lng -79.389167}}
    {:team "Yankees" :stadium "Yankee Stadium" :coords {:lat 40.829167 :lng -73.926389}}})

(def office-data
  (reduce (fn [coll stadium]
            (let [employees (+ 200 (rand-int 1801))
                  record (assoc stadium :employees employees)]
              (conj coll record)))
    #{} stadiums))

(comment
  (json/generate-stream office-data (io/writer "data/offices.json")))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;; issues

(defn rand-date
  "Returns a random datetime-local string. When given a start-date the returned date will
  be after the start-date."
  [& [start-date & _]]
  (let [dates (filter (partial <= (or start-date 1420070400000)) ; max of Aug 1 2016
                ;; use a minimum date of Jan 1 2015
                (take 1000000 (repeatedly (fn [] (long (rand 1470009600000))))))]
    (-> (first dates)
      tc/from-long
      tc/to-string)))

(defn format-person-name [{:keys [prefix first-name surname]}]
   (->> (filter string? [prefix first-name surname])
     (s/join " ")))

(defn format-first-name [{:keys [first-name]}]
  first-name)

(defn gen-full-name []
  (format-person-name (name/gen-name-data-as-map)))

(defn gen-first-name []
  (format-first-name (name/gen-name-data-as-map)))

(defn gen-email []
  (let [account (gen-first-name)
        street-name (gen-first-name)
        tld (rand-nth ["com" "org" "pizza"])]
    (format "%s@%s.%s" account street-name tld)))

(def corpus
  (as-> (slurp (java.net.URI. "http://textfiles.com/etext/FICTION/baum-marvelous-278.txt")) words
    (s/split words #"[\s\n\.\;\,/\\\!\"]")
    (filter #(> (count %) 4) words)))

(defn gen-word []
  (rand-nth corpus))

(defn gen-words []
  (->> (take 10 (repeatedly (fn [] (gen-word))))
    (s/join " ")))

(defn rand-nth-weighted [items]
  (rand-nth
    (reduce-kv (fn [coll weight item]
                 (into coll (repeat weight item)))
      [] items)))

(defn gen-report []
  (let [status (rand-nth-weighted {3 "open" 7 "closed"})
        submitted-date (rand-date)
        end-date (if (= status "closed")
                   (-> submitted-date tc/from-string tc/to-long rand-date))]
    {'submittedAt submitted-date
     'customerName (gen-full-name)
     'customerEmail (gen-email)
     'description (gen-words)
     'status status
     'closedAt end-date
     'employee (gen-full-name)}))

(defn to-csv
  "Adds the keys as a csv header and strips keys from each record"
  [[rec & _ :as records]]
  (let [header (keys rec)
        sanitized-records (map vals records)]
    (conj sanitized-records header)))


(let [data (->> (repeatedly (fn [] (gen-report)))
             (take 200)
             (to-csv))]
  (try
    (with-open [out-file (io/writer "data/reports.csv")]
      (csv/write-csv out-file data))
    (catch Exception e (format "Exception %s" e))))


(defn gen-customer []
  (let [status (rand-nth-weighted {3 "active" 7 "inactive"})
        joined-date (rand-date)
        quit-date (if (= status "inactive")
                   (-> joined-date tc/from-string tc/to-long rand-date))]
    {'joined joined-date
     'quit quit-date
     'customerName (gen-full-name)}))

(comment
  (let [data (->> (repeatedly (fn [] (gen-customer)))
               (take 200)
               (to-csv))]
    (with-open [out-file (io/writer "data/customers.csv")]
      (csv/write-csv out-file data))))
