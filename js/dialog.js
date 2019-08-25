(function() {
    var setupUploadFile = document.querySelector(".upload input");
    window.overlay = document.querySelector(".overlay");

    setupUploadFile.addEventListener("mousedown", function(evt) {
        evt.preventDefault();
        
        window.overlayDefaultSetOff = {
            top: overlay.offsetTop,
            left: overlay.offsetLeft
        }
        
        window.dragged = false;

        var startCoordinates = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function(evtMove) {
            evtMove.preventDefault();
            window.dragged = true;

            var shift = {
                x: startCoordinates.x - evtMove.clientX,
                y: startCoordinates.y - evtMove.clientY
            };

            startCoordinates = {
                x: evtMove.clientX,
                y: evtMove.clientY
            };

            overlay.style.top = overlay.offsetTop - shift.y + "px";
            overlay.style.left = overlay.offsetLeft - shift.x + "px";
        };

        var onMouseUp = function(evtUp){
            evtUp.preventDefault();
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            if (window.dragged) {
                var onClickPreventDefault = function(evt){
                    evt.preventDefault();
                    setupUploadFile.removeEventListener("click", onClickPreventDefault);
                }
                setupUploadFile.addEventListener("click", onClickPreventDefault);
            }
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
})();
