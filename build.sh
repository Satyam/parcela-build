jshint src/**/*.js
mkdir ./site/apitmp
yuidoc -q --themedir ./apitheme
mv -f -t ./site/api ./site/apitmp/* 
rmdir ./site/apitmp
browserify -r ./src/parcela:parcela -u fake-dom -u jsdom > ./site/dist/parcela.js
uglifyjs ./site/dist/parcela.js -c drop_debugger,drop_console,warnings=false -m >./site/dist/parcela-min.js
jekyll build
