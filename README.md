# Proiect_Licenta
Repository pentru proiectul de licenta

Instalarea aplicaților și configurarea mediului de dezvoltare:
1.	Instalați XAMPP pe computerul dvs. pentru a avea un server MySQL și Apache. Puteți descărca XAMPP de la adresa https://www.apachefriends.org/index.html.
2.	Configurați baza de date MySQL utilizând interfața XAMPP. 
3.	Instalați Visual Studio Code (VS Code) pe computerul dvs. Puteți descărca VS Code de la adresa https://code.visualstudio.com/.
4.	Configurați mediul de dezvoltare React Native pe computerul dvs., urmând ghidurile oficiale. Asigurați-vă că Node.js este instalat, dacă nu este instalat deja, acesta se poate găsi la adresa: Download | Node.js (nodejs.org).
5.	Deschide-ți proiectul în React Native folosind VS Code.
Configurarea Raspberry Pi și conectarea dispozitivelor:
1.	Conectați senzorul de mișcare la Raspberry Pi utilizând pini GPIO. Consultați documentația senzorului de mișcare și conexiunile potrivite.
2.	Asigurați-vă că Raspberry Pi are o conexiune la internet și că poate accesa adresa IP a serverului MySql și al transmisiei video de la camera IP.
3.	Instalați Python pe Raspberry Pi, dacă nu este deja instalat.
4.	Instalați bibliotecile necesare în Raspberry Pi pentru a utiliza senzorul de mișcare, PyTesseract și altele. Utilizați comenzile potrivite pentru a instala aceste biblioteci. Rulați comenzile următoare:
“sudo apt install python3-rpi.gpio”, “sudo apt install tesseract-ocr”, “sudo apt install libtesseract-dev”, “pip install pytesseract”, “pip install mysql-connector-python”
Testarea și rularea aplicației:
1.	Asigurați-vă că Raspberry Pi este pornit și conectat la internet.
2.	Porniți serverul XAMPP pe computerul dvs. și asigurați-vă că baza de date este accesibilă.
3.	Lansați aplicația React Native pe un emulator de Android sau pe propriul dvs. dispozitiv mobil, asigurându-vă că este conectat la aceeași rețea ca Raspberry Pi.
4.	Testați funcționalitatea aplicației, rulând scripurile Python din Raspberry Pi și apoi folosind aplicația mobilă, pentru lansarea aplicației se rulează comenzile: “node server.js” pentru activarea serverului, “npm start” pentru lansarea aplicației și “npm run android” pentru lansarea aplicației în simulator.
