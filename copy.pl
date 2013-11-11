#!/usr/bin/perl
my $dest = "/opt/lampp/htdocs/newsgame";

system("cp -rf img $dest");
system("cp index.html $dest");
system("cp hs.css $dest");
system("cp -rf js $dest");
system("cp -rf public $dest");
system("cp -rf audio $dest");
system("cp -rf *.php $dest");
