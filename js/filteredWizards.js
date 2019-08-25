(function() {
    window.getRank = function(wizard) {
        var rank = 0;

        if (wizard.colorCoat === colorCoat) {
            rank += 2;
        }

        if (wizard.colorEyes === colorEyes) {
            rank += 1;
        }

        return rank;
    };

    window.namesComparator = function(a, b) {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        } else {
            return 0;
        }
    };

    window.filteredWizards = function() {
        var sortedWizards = window.wizards.sort(function(a, b) {
            var rankDiff = getRank(b) - getRank(a);
            //если нет с одинаковым плаще или глазами
            //отсортировать остальных по имени
            if (rankDiff === 0) {
                rankDiff = window.namesComparator(a.name, b.name);
            }
            return rankDiff;
        });

        return sortedWizards;
    };
})();
