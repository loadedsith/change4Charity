'use strict';

function fileChange(){
    return {
        link: function(scope, element, attrs) {
            element[0].onchange = function() {
                scope[attrs['fileChange']](element[0])

            }
        }
        
    }
};
