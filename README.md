# Dziennik życia 3.0 — PWA

Samodzielna aplikacja HTML/CSS/JS z manifestem i service workerem. Bez backendu i zewnętrznych bibliotek. Dane osobiste są lokalne (IndexedDB, awaryjnie localStorage); hosting służy jedynie do dostarczenia kodu.

## Publikacja na GitHub Pages
1. Rozpakuj ZIP. Utwórz repozytorium na github.com (np. `dziennik-zycia`). Na darmowym GitHub Pages najprościej użyć publicznego repozytorium. Nie przesyłaj prywatnych eksportów JSON.
2. Wgraj zawartość folderu `dziennik-zycia-pwa` do katalogu głównego repozytorium (plik index.html powinien być w root).
3. Wejdź w Settings → Pages → Build and deployment → Source: Deploy from a branch. Wybierz `main` i `/(root)`, Save.
4. Gdy GitHub poda adres strony, otwórz go na iPhonie w Safari. Udostępnij → Dodaj do ekranu początkowego → włącz Otwórz jako aplikację internetową, jeśli widoczne → Dodaj.
5. Uruchom ikonę aplikacji z ekranu początkowego, poczekaj na pierwsze pełne załadowanie. Test offline: włącz tryb samolotowy, zamknij i ponownie otwórz aplikację.

## Test lokalny na Macu
W terminalu w katalogu projektu: `python3 -m http.server 8000` i otwórz `http://localhost:8000`. Nie jest potrzebna instalacja pakietów. Zwykły plik index.html można również otworzyć bez serwera, ale instalacja PWA i offline przez service worker wymagają HTTPS lub localhost. Adres HTTP komputera w sieci LAN nie jest odpowiednikiem HTTPS dla iPhone'a.

## Jak używać
- Kalendarz: wybierz dzień, utwórz koło lub zdarzenie. Big Picture zawiera pięć zakresów czasu.
- Pierwsze koło: skonfiguruj obszary i podkategorie, wpisz wagi (względne, np. 3:2:1) i oceny. Kliknij „Zapisz strukturę jako szablon”. Nowe koła odziedziczą identyfikatory, etykiety, kolory, strukturę i wagi, lecz bez ocen. Po zmianie struktury zapisz nowy szablon, jeśli ma obowiązywać w przyszłości. Nie modyfikuje to poprzednich kół.
- Wyniki: średnia ważona podkategorii; waga 0 wyklucza podkategorię z agregacji, brak oceny podkategorii o dodatniej wadze oznacza brak wyniku. Wyniki mogą mieć jedno miejsce dziesiętne w interfejsie; dane przechowują dokładniejszą wartość. Obszar bez dzieci może być oceniany bezpośrednio.
- Porównaj: wybierz dwa pomiary. Identyczne ID i struktura pozwalają liczyć różnicę w pp. Zmieniona struktura: aplikacja podaje, gdy to możliwe, porównanie identycznie zdefiniowanych wspólnych podkategorii z wagami A. Porównanie wymaga zgodnych definicji. Zmiana nazwy bez zmiany znaczenia zachowuje ID; przy istotnej zmianie znaczenia dodaj nową kategorię. Stare niezależne koła nie są automatycznie dopasowywane po nazwie.
- Import: najpierw wyeksportuj JSON ze starej wersji. Import obsługuje wersję 1 i 2 danych, zastępuje bieżący dziennik po potwierdzeniu. Stare podkategorie zachowują historyczne sumowanie; nowe szablony stosują średnią ważoną. Eksport JSON umożliwia ręczne przenoszenie danych między urządzeniami (brak automatycznej synchronizacji). PWA może mieć inny magazyn niż Safari — importuj w aplikacji uruchomionej z ikony.
- Dane przeglądarki mogą zostać usunięte; regularnie eksportuj kopię JSON do prywatnego miejsca. Nie publikuj kopii na GitHubie.

## Zakres MVP i testy
Sprawdzono składnię JavaScript i service workera, logikę agregacji wielopoziomowej, brak ocen, migrację wersji 1, zachowanie ID, porównanie wspólnej struktury oraz mobilne interakcje w Chromium z symulowanym magazynem danych. Środowisko blokuje nawigację do lokalnego HTTP, więc nie przeprowadzono pełnego testu instalacji service workera, trwałości IndexedDB ani Safari na fizycznym iPhonie. Instrukcja powyżej opisuje test akceptacyjny. Projekt nie jest opublikowany. Historia jest zapisywana jako odrębne migawki struktur w kołach; brak pełnego rejestru rewizji edycji tego samego dnia, automatycznego mapowania dawnych niezależnych ID i synchronizacji chmurowej.
