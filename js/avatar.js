(function() {
    var FILE_TYPES = ["gif", "jpg", "jpeg", "png"];

    var fileChooser = document.querySelector(".upload input[type=file]");
    var preview = document.querySelector(".upload .setup-user-pic");
    var openIcon = document.querySelector(".setup-open-icon");

    fileChooser.addEventListener("change", function() {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function(element) {
            return fileName.endsWith(element);
        });

        if (matches) {
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                preview.src = reader.result;
                openIcon.src = reader.result;
            });

            reader.readAsDataURL(file);
        }
    });
})();
