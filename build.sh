jshint src/**/*.js
yuidoc -q --themedir ./apitheme
browserify -r ./src/parcela:parcela -u fake-dom > ./site/assets/parcela.js
uglifyjs ./site/assets/parcela.js -c drop_debugger,drop_console,warnings=false -m >./site/assets/parcela-min.js
jekyll build



