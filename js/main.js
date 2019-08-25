//Module 1
var fireballSize = 22;
var getFireballSpeed = function (left) {
    return left ? 5 : 2;
};

getFireballSpeed(true);

var wizardSpeed = 3;
var wizardWidth = 70;

var getWizardHeight = function () {
    return 1.337 * wizardWidth;
};

getWizardHeight();

var getWizardX = function (width) {
    return width / 2 - wizardWidth / 2;
};

var getWizardY = function (height) {
    return height / 3 + getWizardHeight() / 2;
};