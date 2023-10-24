посилання на Web-додаток 
https://fandrii.github.io/project-js-fundamentals/


# Project requirements
💾🗄️💻

**LocalStorage **
*можна зробити те саме на “IndexedDB”*

Розробити Web-додаток форми реєстрації користувача для пошуку роботи – сторінка містить поля для введення користувацьких даних (прізвище, ім’я, вік, освіта, бажана посада). Додати можливість зберігання даних користувача на стороні клієнта (використовуючи *LocalStorage*), а також їх вичитування з локальної бази.

*Вимоги:*
1.    Додати функцію, яка перевіряє наявність доступу до мережі.
2.    Якщо функція повертає `false `- дані читаються та записуються в *localStorage*. Наприклад, нові дані користувача будуть спочатку записуватись в *localStorage*, а вже потім, при наявності мережі (інтернету) додаватись на сторінку. При першому відкриванні сторінки має перевірятись наявність даних в *localStorage *та виконуватися промальовування їх на сторінці.
3.    Якщо функція повертає  `true`, то дані мають відправлятись на сервер і читатись з сервера. В цьому випадку дозволяється додати функцію, яка емулюватиме відправку даних на сервер та читання з сервера.
4.    При відкриванні сторінки має реєструватись *Event Listener*, що слухатиме зміну статуса мережі. Якщо користувач виходить онлайн, то на зміну статуса має спрацювати функція, що витягне дані з *LocalStorage* та опублікує на сторінці. 
5.    Після публікації даних на сторінці вони видаляються із *LocalStorage*.
