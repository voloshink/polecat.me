$(function(){
        var rolling = false;
        var results = [];

        var machine1 = $("#machine1").slotMachine({
            active  : 0,
            delay   : 500,
            direction: 'down',
        });
        var machine2 = $("#machine2").slotMachine({
            active  : 1,
            delay   : 700,
            direction: 'down',
        });
        var machine3 = $("#machine3").slotMachine({
            active  : 2,
            delay   : 900,
            direction: 'down',
        });
        function onComplete(active) {
            playAudio(active);
            switch(this.element[0].id) {
                case 'machine1':
                    results.push(active);
                    break;
                case 'machine2':
                    results.push(active);
                    break;
                case 'machine3':
                    rolling = false;
                    results.push(active);
                    checkResults(results);
                    break;
            }
        }
        $("#roll").click(function() {
            if (rolling) return;
            rolling = true;
            results = [];
            machine1.shuffle(5, onComplete);
            setTimeout(function(){
                machine2.shuffle(5, onComplete);
            }, 500);
            setTimeout(function(){
                machine3.shuffle(5, onComplete);
            }, 1000);
        });

        $('#mute').click(function() {
            var $glyph = $('#mute-glyph');
            if ($glyph.hasClass('glyphicon-volume-off')) {
                volume = true;
                $glyph.removeClass('glyphicon-volume-off');
                $glyph.addClass('glyphicon-volume-up');
            } else {
                $glyph.removeClass('glyphicon-volume-up');
                $glyph.addClass('glyphicon-volume-off');
                volume = false;
            }
        });

    });

var volume = true;

function playAudio(index) {
    if (!volume) return;
    switch(index) {
        case 0:
            document.getElementById('yee_s').play();
            break;
        case 1:
            document.getElementById('paa_s').play();
            break;
        case 2:
            document.getElementById('tip_s').play();
            break;
        case 3:
            document.getElementById('pepe_s').play();
            break;
        case 4:
            document.getElementById('bar_s').play();
            break;
        case 5:
            document.getElementById('aslan_s').play();
            break;
    }
}

function checkResults(results) {
    for (var i = 1; i < results.length; i++) {
        if (results[i - 1] !== results[i]) return;
    };
    bigWin();
}

function bigWin() {
    document.getElementById('bigwin_s').play();
    console.log('big win');
    randomFade();
}

function randomFade() {
    // For suggestions on how to optimize this please email me at idont@giveashit.com
    $('.klappa').each(function(i, el) {
        $(el).css('visibility','visible').hide().fadeIn(Math.floor(Math.random() * (1700 - 300)) + 300, function() {
            $(el).fadeOut(Math.floor(Math.random() * (1700 - 300)) + 300, function() {
                $(el).fadeIn(Math.floor(Math.random() * (1700 - 300)) + 300, function() {
                    $(el).fadeTo(Math.floor(Math.random() * (1700 - 300)) + 300, 0.1, function() {
                        $(el).css('visibility', 'hidden');
                    });
                });
            });
        });
    })
}