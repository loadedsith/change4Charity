'use strict';

function backImgDirective(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'background-size' : '100%'
        });
    };
};

function fileChange(){
    return {
        link: function(scope, element, attrs) {
            element[0].onchange = function() {
                scope[attrs['fileChange']](element[0])

            }
        }
        
    }
};