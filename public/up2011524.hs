--
-- MATHFUN
-- Template for the Haskell assignment program (replace this comment)
-- Add your student number
--

--
-- Imports
--
import Data.Char
import Text.Printf
import Data.List
import Control.Concurrent



--
-- Types (define your Station type here)
--
type Station = (String, (Float, Float), [Float])


-- testData :: [Station]
-- testData = [ ... the 10 Station values ... ]
-- testData = [("Mumbles Head", (51.565, -3.981), [8.26, 8.33, 9.84, 12.36, 15.24, 17.83, 19.55, 19.67, 17.97, 14.70, 11.49, 9.09])]
-- testData=[
--     ("Mumbles Head", (51.565, -3.981),[8.26, 8.33, 9.84, 12.36, 15.24, 17.83, 19.55, 19.67, 17.97, 14.70, 11.49, 9.09]), 
-- ("Greenwich Park",(51.477, 0.004),[8.47, 9.21, 12.07, 15.35, 18.59, 21.37, 23.75, 23.31, 20.29, 15.83, 11.55, 8.85]),
-- ("Solent", (50.807, -1.208),[8.56, 8.74, 11.01, 13.94, 17.07, 19.59, 21.62, 21.61, 19.38, 15.73, 11.88, 9.17]),("Ronaldsway",(54.085, -4.632),[8.47, 8.35, 9.44, 11.48, 14.33, 16.52, 18.19, 18.15, 16.56, 13.83, 11.10, 9.17]),("Baltasound",(60.749, -0.850),[6.55, 6.32, 7.35, 9.16, 11.20, 13.25, 15.08, 15.39, 13.62, 10.88, 8.47, 7.00]),("St Austell",(50.337, -4.787),[9.46, 9.65, 11.33, 13.30, 16.18, 18.10, 20.60, 20.36, 18.54, 14.99, 12.30, 10.18])]

testData :: [Station]
testData = [ 
        ("Mumbles Head", (51.565, -3.981), [8.26, 8.33, 9.84, 12.36, 15.24, 17.83, 19.55, 19.67, 17.97, 14.70, 11.49, 9.09]),
        ("Greenwich Park", (51.477, 0.004), [8.47, 9.21, 12.07, 15.35, 18.59, 21.37, 23.75, 23.31, 20.29, 15.83, 11.55, 8.85]),
        ("Solent", (50.807, -1.208), [8.56, 8.74, 11.01, 13.94, 17.07, 19.59, 21.62, 21.61, 19.38, 15.73, 11.88, 9.17]),
        ("Ronaldsway", (54.085, -4.632), [8.47, 8.35, 9.44, 11.48, 14.33, 16.52, 18.19, 18.15, 16.56, 13.83, 11.10, 9.17]),
        ("Baltasound",(60.749, -0.850), [6.55, 6.32, 7.35, 9.16, 11.20, 13.25, 15.08, 15.39, 13.62, 10.88, 8.47, 7.00]),
        ("St Austell", (50.337, -4.787), [9.46, 9.65, 11.33, 13.30, 16.18, 18.10, 20.60, 20.36, 18.54, 14.99, 12.30, 10.18]),
        ("Heathrow" ,(51.479, -0.449) ,[8.42, 8.98, 11.73, 15.00, 18.37, 21.57, 23.89, 23.40, 20.22, 15.81, 11.47, 8.79]),
        ("Hunstanton", (52.939, 0.493), [7.05, 7.45, 9.77, 12.65, 15.96, 18.84, 21.34, 21.28, 18.32, 14.46, 10.29, 7.56]),
        ("Durham", (54.767, -1.583), [6.86, 7.75, 9.87, 12.49, 15.42, 17.96, 20.24, 19.87, 17.36, 13.51, 9.65, 7.07]),
        ("Monks Wood", (52.400, -0.233), [7.58, 8.36, 11.05, 14.14, 17.19, 20.01, 22.63, 22.49, 19.50, 15.18, 10.68, 7.85]) ]



testTemps :: [Float]
testTemps=[8.26, 8.33, 9.84, 12.36, 15.24, 17.83, 19.55, 19.67, 17.97, 14.70, 11.49, 9.09]

testStation :: Station
testStation =("Mumbles Head", (51.565, -3.981),[8.26, 8.33, 9.84, 12.36, 15.24, 17.83, 19.55, 19.67, 17.97, 14.70, 11.49, 9.09])
--
--  Your functional code goes here
--

 --Part i. Return a list of the names of all the weather stations
outputAllNames :: [Station] -> [String]
outputAllNames station =  [ name|(name,coordinates,temp)<-station]



--Part ii
-- output the data after adding a new station "Valley" with coordinates
--          -- (53.252, -4.537) and temperature data 8.37, 8.44, 9.84, 12.09, 
--          -- 15.01, 17.24, 18.77, 18.76, 17.26, 14.31, 11.26, 9.09]
addStation :: [Station] -> String -> Float -> Float -> [Float] -> [Station]
addStation stations name x y temps = stations  ++ [(name,(x,y),temps)]

-- output the data with all temperature values converted to degrees Fahrenheit

--Part iii
outputDataFahr :: [Station] -> [Station]
outputDataFahr station =  [ (name,coordinates, toFahr temp)|(name,coordinates,temp)<-station]


toFahr :: [Float] -> [Float]
toFahr temps= [((i*9)/5)+32 | i <- temps]

--Part iv
stationsWarmerThan :: [Station] -> Int -> Float -> [Station]
stationsWarmerThan  [] x y =[]
stationsWarmerThan  _ 0 _ =[]
stationsWarmerThan ((name,co,temps):tail) month temp
    |temps!!(month-1)>temp = (name,co,temps):stationsWarmerThan tail month temp
    |otherwise = stationsWarmerThan tail month temp

namesStationsWarmerThan :: [Station] -> Int -> Float -> [String]
namesStationsWarmerThan [] x y =[]
namesStationsWarmerThan stations month temp = outputAllNames(stationsWarmerThan stations month temp)
--Part v
stationsToString :: [Station] -> String
stationsToString stations = replicate 141 '-'++
                "\n|  Station Name   |  N   |  E   |  Jan   |  Feb   |  Mar   |  Apr   |  May   |  Jun   |  Jul   |  Aug   |  Sep   |  Oct   |  Nov   |  Dec   |\n"
                ++replicate 141 '-' ++"\n"++ tableString stations ++ replicate 141 '-' 


tableString :: [Station] -> String
tableString [] = []
tableString (x:xs) =printf( singleString x ++ "\n"++ tableString xs )

singleString :: Station -> String
singleString (name,x,temps) =printf "| %-15s %5s %s |" name (coordString x) (tempsString temps)

coordString :: (Float, Float) -> String
coordString (x,y) = printf "| %-3.4v | %3.4v |" (show x ) (show y)

splitFloat:: Float -> String
splitFloat = printf "%6.2v"

tempsString :: [Float] -> String
tempsString xs = intercalate " | " (map splitFloat xs)


-- stationsToString (x:xs) = printf"|  %4s "hi" + singleString x ++ "\n"++ stationsToString xs 

--Part vi
-- output the data after changing the temperature of "Heathrow" for July to
--          -- 25 degrees Celsius
updateTemp :: [Station] -> String ->Int -> Float-> [Station]
updateTemp [] s m t = []
updateTemp  ((name,co,temps):tail) station month temperature
    |name==station =(name, co, changeTemp temps (month - 1) temperature):updateTemp tail station month temperature
    |otherwise =(name,co,temps):updateTemp tail station month temperature

changeTemp :: [Float] -> Int -> Float -> [Float]
changeTemp [] m t =[]
changeTemp (x:xs) month temp
    |month==0 = temp:xs
    |otherwise =x:changeTemp xs (month-1) temp

-- headings::[Station] -> String
-- headings station= "hi" ++ stationsToString station
--Part Vii
-- output the name of the nearest weather station to location (50.2N, -0.4E)
--          -- which has a March temperature warmer than 10 degrees Celsius

nearestStationWarmer :: [Station] ->Float -> Float -> Int -> Float  ->  String
nearestStationWarmer stations n e month temp 
    |stationsWarmerThan stations month temp ==[] = "none"
    |otherwise =smallestDistance (minimum(distanceName (stationsWarmerThan stations month temp) n e))

distanceName :: [Station] -> Float -> Float -> [(Float,String)]
distanceName stations n e =[distance station n e |station <-stations] 
-- distanceName (stations) n e =[n= |station <- stations] 

distance :: Station-> Float -> Float ->  (Float,String)
-- distancer (name,(n,e),temp) h t =n
distance (name,(n2,e2),temp) n1 e1 =(sqrt((n2-n1)**2+(e2-e1)**2),name)

smallestDistance :: (Float,String) -> String
smallestDistance (distance,name) = name

--
--  Demo
--

demo :: Int -> IO ()
demo 1 =  putStrLn $ show $ outputAllNames testData
-- demo 2 =putStrLn$ show $ addStation testData  "vally" 53.232 (-4.537)  [8.37, 8.44, 9.84, 12.09, 8.37, 8.44, 9.84, 12.09, 15.01, 17.24, 18.77, 18.76, 17.26, 14.31, 11.26, 9.09]
demo 2 = putStrLn $ stationsToString $ addStation testData  "Valley" 53.232 (-4.537)  [8.37, 8.44, 9.84, 12.09, 15.01, 17.24, 18.77, 18.76, 17.26, 14.31, 11.26, 9.09]
-- demo 3 = putStrLn $ show $ outputDataFahr testData
demo 3 = putStrLn $ stationsToString $ outputDataFahr testData
demo 4 = putStrLn $ show $ namesStationsWarmerThan testData 8 20
demo 5 = putStrLn (stationsToString testData)
demo 6 = putStrLn $ stationsToString $ updateTemp testData "Heathrow" 7 25
demo 7 = putStrLn $ show $ nearestStationWarmer testData 50.2 (-0.4) 3 10

demo 8 = allBars testData 0

-- bar :: [Station] -> [String]
-- bar stations =map (readthebar) stations

monthBar :: [Station] -> Int -> String
-- monthBar stations month = [readthebar statiorn month|statiorn<-stations]
monthBar [] m = []
monthBar (x:xs) month = printf (readthebar x month ++"\n"++ monthBar xs month)

allBars :: [Station] -> Int -> IO()
allBars _ 12 = return()
allBars stations n = do
    clearScreen
    writeAt (0,0) (monthList !! n)
    goTo(0,5)
    putStrLn (monthBar stations  n++axis)
    threadDelay 1000000
    allBars stations (n+1)



axis :: String
axis = replicate 18 '-' ++"|"++ replicate 8 '-' ++ loopList [4,8,12,16,20,24]
loopList :: [Int] -> String
loopList [] = []
loopList (x:xs) = printf "%v" x ++ replicate 7 '-' ++ loopList xs

monthList=["Jan", "Feb", "Mar", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"]
    
-- monthBar :: [Station] -> Int -> String
-- -- monthBar stations month = [readthebar statiorn month|statiorn<-stations]
-- monthBar [] m = []
-- monthBar (x:xs) month = printf (readthebar x month ++"\n"++ monthBar xs month)

-- fullbar :: Int -> [Station] -> String
-- -- fullbar 0 []=""
-- -- fullbar n stations = monthBar (n stations)
-- -- fullbar 0 _ =""
-- fullbar n stations =  ( monthBar stations n ++"\n\n"++ fullbar (n-1) stations)
-- -- fullbar n stations = putStrLn( monthBar stations n ++"\n\n"++ fullbar (n-1) stations)
-- -- fullbar n stations = printf "%v  %v" ( monthBar stations n ) (fullbar (n-1) stations)

-- wholebar :: [Station] -> IO()
-- wholebar station = do
--     -- printf "+"/n" +jan"
--     clearScreen
--     goTo(0,5)
--     printf ("JAN\n"++monthBar station 0)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("FEB\n"++monthBar station 1)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("MAR\n"++monthBar station 2)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("APR\n"++monthBar station 3)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("MAY\n"++monthBar station 4)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("JUN\n"++monthBar station 5)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("JULY\n"++monthBar station 6)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("AUG\n"++monthBar station 7)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("SEP\n"++monthBar station 8)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("OCT\n"++monthBar station 9)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("NOV\n"++monthBar station 10)
--     threadDelay 1000000
--     clearScreen
--     goTo(0,5)

--     printf ("DEC\n"++monthBar station 11)
--     -- clearScreen
--     -- print "feb"
--     -- printf (monthBar station 1)

-- -- fullbar staions n = (monthBar stations n)-- ++ fullbar station (n-1)



readthebar :: Station-> Int-> String
readthebar (x,y,temp) n =printf "| %-15v | %v " x (hashingOnScreen (round (temp!!n)))
--[ name|(name,coordinates,temp)<-station]
-- stationsWarmerThan  [] x y =[]
-- stationsWarmerThan ((name,co,temps):tail) month temp

hashingOnScreen :: Int -> String
hashingOnScreen 0=""
hashingOnScreen n = "##"++hashingOnScreen (n-1)
--
-- Screen Utilities (use these to do the bar chart)
--

type ScreenPosition = (Int,Int)

-- Clears the screen
clearScreen :: IO ()
clearScreen = putStr "\ESC[2J"

-- Moves to a position on the screen
goTo :: ScreenPosition -> IO ()
goTo (x, y) = putStr ("\ESC[" ++ show y ++ ";" ++ show x ++ "H")

-- Writes a string at a position on the screen
writeAt :: ScreenPosition -> String -> IO ()
writeAt position text = do
    goTo position
    putStr text
 







 -- output the data after changing the temperature of "Heathrow" for July to
--          -- 25 degrees Celsius



-- hotStations :: [Station] -> [Float]
-- hotStations station =  [ z|(name,coordinates,temp(x:y:z:xs))<-station]

-- hotStation :: [Station] -> String
-- hotStation 

-- isAugHot :: [Float] -> Bool
-- isAugHot (jan:feb:mar:apr:may:jun:jul:xs)
--     |jul>20 =True
--     |otherwise =False

-- hotStation :: [Station] -> [String]
-- hotStation stations =  [aug thestation |(thestation <-stations]




-- aug :: Station -> String
-- aug (name,co, (jan:feb:mar:apr:may:jun:jul:xs))
--     |jul>20 = name
--     |otherwise ="cold"

-- hotStation :: [Station] -> [String]
-- hotStation  station =  [ aug x |x<-station]

-- aug :: Station -> String
-- aug (name,co,temp) = name


-- aug (name,co, (jan:feb:mar:apr:may:jun:jul:xs))
--     |jul>20 = name
--     |otherwise =""
-- isAugHot (jan:feb:xs)=feb


-- stationsWarmerThan :: [Station] -> int -> Float -> [Station]
-- stationsWarmerThan  [] x y =[]
-- stationsWarmerThan (name,co,temps) month temp
--     |temps!!month>temp = (name,co,temps)
--     |otherwise = :stationsWarmerThan (name,co,temps) month temp





-- stationsWarmerThan :: [Station] -> Int -> Float -> [Station]
-- stationsWarmerThan  [] x y =[]
-- stationsWarmerThan ((name,co,temps):tail) month temp
--     |temps!!month+1>temp = (name,co,temps):stationsWarmerThan tail month temp
--     |otherwise = stationsWarmerThan tail month temp
-- stationHigherTemp :: [Station] -> [String]
-- stationHigherTemp station month temp = stationsWarmerThan station month temp(name)

-- output the data after changing the temperature of "Heathrow" for July to
--          -- 25 degrees Celsius


-- updateTemp :: [Station] -> String ->Int -> Float-> [Station]
-- updateTemp [] s m t = []
-- updateTemp  ((name,co,temps):tail) station month temperature
--     |name==station = (name,co,temps):updateTemp tail station month temperature
--     |otherwise =(name,co,temps):updateTemp tail station month temperature

-- shouldItChange :: 
-- changeTemp :: Station -> Int -> Float -> Float -> Station
-- changeTemp (name,co,temps) month temperature
--     -- |temps!!month == temperature
--     |(name,co,temps) month temperature =(name,co, [ swapvalue temp temperature | temp <- temps ])


-- stationsWarmerThan :: [Station]-> Int -> Float -> Station
-- -- stationsWarmerThan [] = []
-- stationsWarmerThan (x:xs) = x

--ADD STATION TEST
--addStation testData "Vally" 53.252 (-4.537) [8.37, 8.44, 9.84, 12.09, 15.01, 17.24, 18.77, 18.76, 17.26, 14.31, 11.26, 9.09]


-- dataToString :: [Station] -> String




    -- toFahr temps= [((i*9)/5)+32 | i <- temps]
-- = 
-- Your bar chart code goes here
--



--
-- Your user interface (and loading/saving) code goes here
--
main = do  
    -- fromFile <- readFile "stations.txt"
    -- options storedData
    
    -- let storedData :: [Station]
    -- let storedData = fromFile
    -- print outputAllNames storedData

    --demo 1 --This will change to load as well
    let storedData = testData
    options storedData
options :: [Station] -> IO()
options storedData= do
    clearScreen
    putStrLn "\nMENU"
    menu
    option <- getLine
    if option == "1"
        then do
            putStrLn $ show $ outputAllNames storedData
            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData
    else if option == "2"
        then do
            putStrLn "Enter the stations name"
            name <- getLine
            putStrLn "Enter degrees North"
            n <- getFloat
            putStrLn "Enter degrees East"
            e <- getFloat
            
            let listOfTemps=[]

            putStrLn "Enter temperature for Jan"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Feb"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Mar"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Apr"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for May"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for June"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for July"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for August"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Sep"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Oct"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Nov"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp
            putStrLn "Enter temperature for Dec"
            temp <- getFloat
            let appendTemp = append temp listOfTemps
            let listOfTemps=appendTemp

            -- putStrLn "Enter temperature for Feb"
            -- temp <- getFloat
            -- let listOfTemps = append temp listOfTemps
            -- putStrLn "Enter temperature for Mar"
            -- temp <- getFloat
            -- let listOfTemps = append temp listOfTemps

            print listOfTemps

            let toStore = addStation  storedData name n  e listOfTemps

            let storedData = toStore
            -- putStrLn "Enter temperature for Feb"
            -- temp <- getFloat
            -- append temp listOfTemps
            -- putStrLn "Enter temperature for Mar"
            -- temp <- getFloat
            -- append temp listOfTemps




            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData

    else if option == "3"
        then do
            putStrLn $ stationsToString $ outputDataFahr storedData
            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData

    else if option == "4"
        then do
            putStrLn "Enter Month as a number i.e. 1 for Jan and 12 for Dec"
            month <- getInt
            putStrLn "Enter Temp"
            temp <- getFloat
            print(namesStationsWarmerThan storedData  month temp )

            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData
    else if option == "5"
        then do
            putStrLn (stationsToString storedData)

            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData

    else if option == "6"
        then do
            putStrLn "Enter the stations name"
            name <- getLine
            putStrLn "Enter Month as a number i.e. 1 for Jan and 12 for Dec"
            month <- getInt
            putStrLn "Enter new temp"
            temp <- getFloat


            let toStore = updateTemp storedData name month temp
            let storedData = toStore
            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData

    else if option == "7"
        then do
            putStrLn "Enter degrees North"
            n <- getFloat
            putStrLn "Enter degrees East"
            e <- getFloat

            putStrLn "Enter Month as a number i.e. 1 for Jan and 12 for Dec"
            month <- getInt
            putStrLn "Enter new temp"
            temp <- getFloat

            putStrLn (nearestStationWarmer storedData n e month temp)
            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData
    else if option == "8"
        then do
            allBars storedData 0
            putStrLn "\nPress enter to go back to menu"
            getLine
            options storedData
    else if option == "9"
        then do
            putStrLn "exiting..."

    else
        do            
            putStrLn "You must pick a correct option"
            options storedData
    
    -- name <- getLine  
    -- putStrLn ("Hey " ++ name ++ ", you rock!")  

menu :: IO()
menu= do
    putStrLn "Here are your options\n"
    putStrLn "1. Return a list of the names of all the weather stations.\n"
    putStrLn "2. Add a new weather station given a name, location (degrees north and east) and 12 temperature values.\n"
    putStrLn "3. Return all the data with all the temperature values converted to degrees Fahrenheit.\n"
    putStrLn "4. Given a month and a Celsius value, return a list of the names of all weather stations \nthat have a higher temperature value for that month.\n"
    putStrLn "5. Return all the data as a single string which, when output using putStr, will display the \ndata formatted neatly into a table of 15 columns giving the name, location (degrees \nN & E formatted to 1 decimal place), and the 12 temperature values (from January to \nDecember each formatted to 1 decimal place).\n"
    putStrLn "6. Replace a temperature value given a station name, a month and a new temperature.\n"
    putStrLn "7. Given a location (N and E figures), a month and a temperature value, return the name \nof the closest weather station with an higher temperature for that month, or “none”\nif no such station exists\n"
    putStrLn "8. Show bar chart\n"
    putStrLn "9. Exit\n"


-- getFloat :: String -> Int

append :: Float -> [Float] -> [Float]
append a [] = [a]
append a xs = foldr (:) [a] xs

-- getManyTemp :: Int -> [Int] -> [Int]
-- getManyTemp 0 []=[]
-- getManyTemp n listOfTemp = append getInt listOfTemp

-- getTemp :: Int
-- getTemp = do
--     putStrLn "Enter Temp"
--     =getInt

getInt :: IO Int
getInt = fmap read getLine

getFloat :: IO Float
getFloat = fmap read getLine


-- readthefile::IO()
-- readthefile = do file


-- readthefile :: IO ()
-- readthefile = do
--   eitherErrorStations <- parseStations <$> readFile "stations.txt"
--   case eitherErrorStations of
--     Left err ->
--       error err
--     Right stations ->
--       selectOptions stations

-- parseStations :: String -> Either String [Station]
-- parseStations s = Parse [s]