var COAT_COLORS = [
    "rgb(241, 43, 107)",
    "rgb(215, 210, 55)",
    "rgb(146, 100, 161)",
    "rgb(101, 137, 164)",
    "rgb(0, 0, 0)",
    "rgb(56, 159, 117)"
];

var EYES_COLORS = ["yellow", "black", "red", "blue", "green"];

var FIREBALL_COLORS = [
    "rgb(241, 43, 107)",
    "rgb(215, 210, 55)",
    "rgb(146, 100, 161)",
    "rgb(101, 137, 164)",
    "rgb(0, 0, 0)",
    "rgb(56, 159, 117)",
    "yellow",
    "black",
    "red",
    "blue",
    "green"
];

var INTERVAL = 1000;

var colorCoat;
var colorEyes;
window.wizards;

var randomColor = function(color) {
    return color[Math.floor(Math.random() * color.length)];
};

var userDialog = document.querySelector(".setup");
var setupOpen = document.querySelector(".setup-open");
var setupClose = document.querySelector(".setup-close");

var fragment = document.createDocumentFragment();

var similarWizardTemplate = document
    .querySelector("#similar-wizard-template")
    .content.querySelector(".setup-similar-item");

var renderWizard = function(wizards) {
    for (var i = 0; i < 4; i++) {
        var wizardElement = similarWizardTemplate.cloneNode(true);

        wizardElement.querySelector(".setup-similar-label").textContent =
            wizards[i].name;

        wizardElement.querySelector(".wizard-coat").style.fill =
            wizards[i].colorCoat;

        wizardElement.querySelector(".wizard-eyes").style.fill =
            wizards[i].colorEyes;

        fragment.appendChild(wizardElement);
    }

    var similarListElement = document.querySelector(".setup-similar-list");

    var oldChild = document.querySelectorAll(".setup-similar-item");

    if (oldChild.length > 0) {
        for (var i = 0; i < 4; i++) {
            similarListElement.removeChild(oldChild[i]);
        }
    }
    similarListElement.appendChild(fragment);
};

var onLoad = function(response) {
    window.wizards = response;
};

var onError = function(errorMessage) {
    alert(errorMessage);
};

window.load(onLoad, onError);

var setupSimilarElement = document.querySelector(".setup-similar");

setupSimilarElement.classList.remove("hidden");

//Открытие и закрытие окна настройки персонажа :

//1  Окно.setup (var userDialog) должно открываться по нажатию на блок .setup-open (var setupOpen)
//2  Окно.setup должно закрываться по нажатию на элемент.setup-close, расположенный внутри окна
//3  Когда иконка пользователя в фокусе .setup-open-icon,
//   то окно настройки персонажа должно открываться по нажатию кнопки ENTER
//4  Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
//4  Если фокус находится на форме ввода имени, то окно закрываться не должно.
//5  Если окно открыто и фокус находится на кнопке закрытия окна,
//   то нажатие клавиши ENTER должно приводить к закрытию диалога

//Forma
var form = document.querySelector(".setup-wizard-form");
//Поле ввода имени персонажа
var setUserName = userDialog.querySelector(".setup-user-name");
//Кнопка отправки формы настроек персонажа
var btnSetup = userDialog.querySelector(".setup-submit");
//Мантия персонажа
var setupWizardCoat = userDialog.querySelector(".setup-wizard .wizard-coat");
//Глаза персонажа
var setupWizardEyes = userDialog.querySelector(".setup-wizard .wizard-eyes");
//Фаербол персонажа
var setupFireball = userDialog.querySelector(".setup-fireball-wrap");
//Скрытый инпут цвет мантии персонажа для отправки настроек на сервер
var setupInputCoat = userDialog.querySelector("input[name='coat-color']");
//Скрытый инпут цвет глаз персонажа для отправки настроек на сервер
var setupInputEyes = userDialog.querySelector("input[name='eyes-color']");
//Скрытый инпут цвет fireball персонажа для отправки настроек на сервер
var setupInputFireball = userDialog.querySelector(
    "input[name='fireball-color']"
);

var onSetupEscPress = function(evt) {
    //Если было нажатие на ESC и нет фокуса на поле ввода имени персонажа
    //вызываем функцию закрытия блока настроек персонажа
    if (evt.keyCode === 27 && evt.target != setUserName) {
        onSetupCloseClick();
    }
};

var lastTimeout;

var onWizardCoatClick = function() {
    colorCoat = randomColor(COAT_COLORS);
    //рандомный цвет мантии
    setupWizardCoat.style.fill = colorCoat;
    //Записываем полученое значение цвета в скрытый инпут для отправки на сервер
    setupInputCoat.value = setupWizardCoat.style.fill;
    var sortedWizards = filteredWizards();
    //Устранение дребезга
    debounce(renderWizard, sortedWizards, INTERVAL);
};

var onWizardEyesClick = function() {
    colorEyes = randomColor(EYES_COLORS);
    //рандомный цвет глаз
    setupWizardEyes.style.fill = colorEyes;
    //Записываем полученое значение цвета в скрытый инпут для отправки на сервер
    setupInputEyes.value = setupWizardEyes.style.fill;
    var sortedWizards = filteredWizards();
    //Устранение дребезга
    window.debounce(renderWizard, sortedWizards, INTERVAL);
};

var onFireballClick = function() {
    //Записываем полученое значение цвета в скрытый инпут для отправки на сервер
    setupInputFireball.value = randomColor(FIREBALL_COLORS);
    //Присваиваем значение цвета в стили
    setupFireball.style.backgroundColor = setupInputFireball.value;
};

var onSetupOpenClick = function() {
    //показывает блок настроек персонажа
    userDialog.classList.remove("hidden");
    //Вешаем прослушиватель по нажатию на ESC закрываем окно настроек
    document.addEventListener("keydown", onSetupEscPress);
    // По клику на мантию меняем цвет
    setupWizardCoat.addEventListener("click", onWizardCoatClick);
    // По клику на глаза меняем цвет
    setupWizardEyes.addEventListener("click", onWizardEyesClick);
    // По клику на fireball меняем цвет
    setupFireball.addEventListener("click", onFireballClick);
};

var onSetupCloseClick = function() {
    //Скрываем блок настроек персонажа
    userDialog.classList.add("hidden");
    //Убираем прослушиватель на ESC когда окно настроек персонажа закрыто
    document.removeEventListener("keydown", onSetupEscPress);
    //Убираем прослушиватель на клик по мантии когда окно закрыто
    setupWizardCoat.removeEventListener("click", onWizardCoatClick);
    //Убираем прослушиватель на клик по глазам когда окно закрыто
    setupWizardCoat.removeEventListener("click", onWizardCoatClick);
    // По клику на fireball меняем цвет
    setupFireball.removeEventListener("click", onFireballClick);
    //
    if (window.dragged) {
        window.overlay.style.top = overlayDefaultSetOff.top + "px";
        window.overlay.style.left = overlayDefaultSetOff.left + "px";
    }
};

//Прослушиватель на клик по иконке персонажа
//Вызываем функцию показа блока настроек персонажа
setupOpen.addEventListener("click", onSetupOpenClick);

//Прослушиватель на нажатие Enter по иконке персонажа
//Вызываем функцию показа блока настроек персонажа
setupOpen.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 13) {
        onSetupOpenClick();
    }
});

//Прослушиватель на клик по значку закрытия блока настроек
//Вызываем функцию закрытия блока
setupClose.addEventListener("click", onSetupCloseClick);

//Прослушиватель на нажатие Enter по значку закрытия блока настроек
//Вызываем функцию закрытия блока
setupClose.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 13) {
        onSetupCloseClick();
    }
});

//Фызов функции отправки формы с данными о маге и закрытием окна настроек
//Без перезагразки страници
btnSetup.addEventListener("click", function(evt) {
    window.save(new FormData(form), onSetupCloseClick, onError);
    evt.preventDefault();
});
