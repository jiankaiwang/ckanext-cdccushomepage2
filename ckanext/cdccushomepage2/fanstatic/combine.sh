#!/bin/bash

defaultPath="/usr/lib/ckan/default/src/ckanext-cdccushomepage/ckanext/cdccushomepage/fanstatic"
catJS=('plotly.js' 'Common.js' 'dengueyearcount.js' 'dengueMonthTrend.js' 'entroLBC.js' 'diarrhea.js' 'influLinechart.js' 'hivBC.js' 'general.js');
destinationJS="combined.js"

if [ -f $defaultPath/$destinationJS ]; then
  rm -f "$defaultPath/$destinationJS"
fi

for i in "${catJS[@]}";
do
  if [ -f $defaultPath/$i ]; then
    cat "$defaultPath/$i" >> "$defaultPath/$destinationJS"
  else
    echo "$defaultPath/$i can'f find."
  fi
done
