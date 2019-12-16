const GEMEINDEN = [
  ['Aasbüttel', '5168'],
  ['Achterwehr', '5803'],
  ['Achtrup', '5489'],
  ['Aebtissinwisch', '5179'],
  ['Agethorst', '5168'],
  ['Ahlefeld-Bistensee', '5890'],
  ['Ahneby', '5990'],
  ['Ahrensbök', '0001'],
  ['Ahrensburg, Stadt', '0001'],
  ['Ahrenshöft', '5494'],
  ['Ahrenviöl', '5453'],
  ['Ahrenviölfeld', '5453'],
  ['Albersdorf', '5175'],
  ['Albsfelde', '5358'],
  ['Alkersum', '5488'],
  ['Almdorf', '5494'],
  ['Alt Bennebek', '5996'],
  ['Alt Duvenstedt', '5833'],
  ['Alt Mölln', '5313'],
  ['Altenhof', '5893'],
  ['Altenholz', '0005'],
  ['Altenkrempe', '5591'],
  ['Altenmoor', '5134'],
  ['Alveslohe', '5043'],
  ['Ammersbek', '0090'],
  ['Appen', '5690'],
  ['Arkebek', '5175'],
  ['Arlewatt', '5492'],
  ['Armstedt', '5005'],
  ['Arnis, Stadt', '5920'],
  ['Arpsdorf', '5895'],
  ['Ascheberg (Holstein)', '0001'],
  ['Ascheffel', '5890'],
  ['Aukrug', '5895'],
  ['Aumühle', '5323'],
  ['Ausacker', '5919'],
  ['Auufer', '5104'],
  ['Aventoft', '5489'],
  ['Averlak', '5163'],
  ['Bad Bramstedt, Stadt', '0004'],
  ['Bad Oldesloe, Stadt', '0004'],
  ['Bad Schwartau, Stadt', '0004'],
  ['Bad Segeberg, Stadt', '0005'],
  ['Badendorf', '5244'],
  ['Bahrenfleth', '5153'],
  ['Bahrenhof', '5086'],
  ['Bäk', '5358'],
  ['Bälau', '5313'],
  ['Bargenstedt', '5175'],
  ['Bargfeld-Stegen', '5218'],
  ['Bargstall', '5847'],
  ['Bargstedt', '5864'],
  ['Bargteheide, Stadt', '0006'],
  ['Bargum', '5494'],
  ['Bark', '5053'],
  ['Barkelsby', '5893'],
  ['Barkenholm', '5169'],
  ['Barlt', '5175'],
  ['Barmissen', '5747'],
  ['Barmstedt, Stadt', '0002'],
  ['Barnitz', '5244'],
  ['Barsbek', '5755'],
  ['Barsbüttel', '0009'],
  ['Basedow', '5343'],
  ['Basthorst', '5373'],
  ['Bebensee', '5053'],
  ['Behlendorf', '5308'],
  ['Behrendorf', '5453'],
  ['Behrensdorf (Ostsee)', '5727'],
  ['Beidenfleth', '5179'],
  ['Bekdorf', '5138'],
  ['Bekmünde', '5138'],
  ['Belau', '5785'],
  ['Beldorf', '5895'],
  ['Bendfeld', '5755'],
  ['Bendorf', '5895'],
  ['Bergenhusen', '5996'],
  ['Bergewöhrden', '5169'],
  ['Beringstedt', '5895'],
  ['Berkenthin', '5308'],
  ['Beschendorf', '5546'],
  ['Besdorf', '5168'],
  ['Besenthal', '5318'],
  ['Bevern', '5660'],
  ['Bilsen', '5660'],
  ['Bimöhlen', '5005'],
  ['Bissee', '5889'],
  ['Blekendorf', '5727'],
  ['Bliestorf', '5308'],
  ['Blomesche Wildnis', '5134'],
  ['Blumenthal', '5859'],
  ['Blunk', '5086'],
  ['Böel', '5974'],
  ['Bohmstedt', '5494'],
  ['Böhnhusen', '5830'],
  ['Bokel', '5864'],
  ['Bokel', '5636'],
  ['Bokelrehm', '5168'],
  ['Bokholt-Hanredder', '5660'],
  ['Bokhorst', '5168'],
  ['Böklund', '5987'],
  ['Boksee', '5747'],
  ['Bollingstedt', '5993'],
  ['Bondelum', '5453'],
  ['Bönebüttel', '0008'],
  ['Bönningstedt', '0005'],
  ['Boostedt', '5063'],
  ['Bordelum', '5494'],
  ['Bordesholm', '5889'],
  ['Boren', '5974'],
  ['Borgdorf-Seedorf', '5864'],
  ['Borgstedt', '5890'],
  ['Borgsum', '5488'],
  ['Borgwedel', '5915'],
  ['Börm', '5996'],
  ['Bornholt', '5895'],
  ['Bornhöved', '5024'],
  ['Börnsen', '5323'],
  ['Borsfleth', '5134'],
  ['Borstel', '5005'],
  ['Borstel-Hohenraden', '5687'],
  ['Borstorf', '5313'],
  ['Bosau', '0007'],
  ['Bosbüll', '5489'],
  ['Bösdorf', '0009'],
  ['Bothkamp', '5747'],
  ['Bovenau', '5888'],
  ['Böxlund', '5952'],
  ['Braak', '5262'],
  ['Braderup', '5489'],
  ['Brammer', '5864'],
  ['Bramstedtlund', '5489'],
  ['Brande-Hörnerkirchen', '5636'],
  ['Brebel', '5974'],
  ['Bredenbek', '5803'],
  ['Bredstedt, Stadt', '5494'],
  ['Breiholz', '5847'],
  ['Breitenberg', '5104'],
  ['Breitenburg', '5104'],
  ['Breitenfelde', '5313'],
  ['Brekendorf', '5890'],
  ['Breklum', '5494'],
  ['Brickeln', '5163'],
  ['Brinjahe', '5853'],
  ['Brodersby', '5893'],
  ['Brodersby', '5987'],
  ['Brodersdorf', '5755'],
  ['Brokdorf', '5179'],
  ['Brokstedt', '5189'],
  ['Bröthen', '5318'],
  ['Brügge', '5889'],
  ['Brunsbek', '5262'],
  ['Brunsbüttel, Stadt', '0011'],
  ['Brunsmark', '5358'],
  ['Brunstorf', '5373'],
  ['Büchen', '5318'],
  ['Buchholz', '5358'],
  ['Buchholz', '5163'],
  ['Buchholz (Forstgutsbez.)', '9014'],
  ['Buchhorst', '5343'],
  ['Büdelsdorf, Stadt', '0034'],
  ['Bühnsdorf', '5086'],
  ['Bullenkuhlen', '5660'],
  ['Bünsdorf', '5890'],
  ['Bunsoh', '5175'],
  ['Burg (Dithmarschen)', '5163'],
  ['Busdorf', '5915'],
  ['Busenwurth', '5175'],
  ['Büsum', '5178'],
  ['Büsumer Deichhausen', '5178'],
  ['Büttel', '5179'],
  ['Christiansholm', '5847'],
  ['Christinenthal', '5168'],
  ['Dagebüll', '5489'],
  ['Dägeling', '5153'],
  ['Dahme', '0010'],
  ['Dahmker', '5373'],
  ['Daldorf', '5063'],
  ['Dalldorf', '5343'],
  ['Damendorf', '5890'],
  ['Damlos', '5546'],
  ['Dammfleth', '5179'],
  ['Damp', '5893'],
  ['Damsdorf', '5024'],
  ['Dänischenhagen', '5822'],
  ['Dannau', '5727'],
  ['Dannewerk', '5915'],
  ['Dassendorf', '5323'],
  ['Dätgen', '5864'],
  ['Delingsdorf', '5218'],
  ['Dellstedt', '5169'],
  ['Delve', '5169'],
  ['Dersau', '5739'],
  ['Diekhusen-Fahrstedt', '5166'],
  ['Dingen', '5163'],
  ['Dobersdorf', '5775'],
  ['Dollerup', '5937'],
  ['Dollrottfeld', '5974'],
  ['Dörnick', '5739'],
  ['Dörphof', '5893'],
  ['Dörpling', '5169'],
  ['Dörpstedt', '5996'],
  ['Drage', '5138'],
  ['Drage', '5492'],
  ['Dreggers', '5086'],
  ['Drelsdorf', '5494'],
  ['Düchelsdorf', '5308'],
  ['Dunsum', '5488'],
  ['Duvensee', '5391'],
  ['Eckernförde, Stadt', '0043'],
  ['Ecklak', '5179'],
  ['Eddelak', '5163'],
  ['Eggebek', '5912'],
  ['Eggstedt', '5163'],
  ['Ehndorf', '5895'],
  ['Einhaus', '5358'],
  ['Eisendorf', '5864'],
  ['Elisabeth-Sophien-Koog', '5492'],
  ['Ellerau', '0019'],
  ['Ellerbek', '5687'],
  ['Ellerdorf', '5864'],
  ['Ellerhoop', '5660'],
  ['Ellhöft', '5489'],
  ['Ellingstedt', '5993'],
  ['Elmenhorst', '5373'],
  ['Elmenhorst', '5218'],
  ['Elmshorn, Stadt', '0015'],
  ['Elpersbüttel', '5175'],
  ['Elsdorf-Westermühlen', '5847'],
  ['Elskop', '5153'],
  ['Embühren', '5853'],
  ['Emkendorf', '5864'],
  ['Emmelsbüll-Horsbüll', '5489'],
  ['Enge-Sande', '5489'],
  ['Engelbrechtsche Wildnis', '5134'],
  ['Epenwöhrden', '5175'],
  ['Erfde', '5996'],
  ['Escheburg', '5323'],
  ['Esgrus', '5990'],
  ['Eutin, Stadt', '0012'],
  ['Fahrdorf', '5915'],
  ['Fahren', '5755'],
  ['Fahrenkrug', '5086'],
  ['Fargau-Pratjau', '5775'],
  ['Fedderingen', '5169'],
  ['Fehmarn, Stadt', '0046'],
  ['Felde', '5803'],
  ['Feldhorst', '5244'],
  ['Felm', '5824'],
  ['Fiefbergen', '5755'],
  ['Fitzbek', '5189'],
  ['Fitzen', '5318'],
  ['Fleckeby', '5893'],
  ['Flensburg, Stadt', '0000'],
  ['Flintbek', '5830'],
  ['Fockbek', '5833'],
  ['Föhrden-Barl', '5005'],
  ['Fredeburg', '5358'],
  ['Fredesdorf', '5053'],
  ['Freienwill', '5919'],
  ['Fresendelf', '5492'],
  ['Frestedt', '5163'],
  ['Friedrich-Wilhelm-Lübke-Koog', '5489'],
  ['Friedrichsgabekoog', '5178'],
  ['Friedrichsgraben', '5847'],
  ['Friedrichsholm', '5847'],
  ['Friedrichskoog', '5166'],
  ['Friedrichstadt, Stadt', '0033'],
  ['Fuhlendorf', '5005'],
  ['Fuhlenhagen', '5373'],
  ['Galmsbüll', '5489'],
  ['Gammelby', '5893'],
  ['Garding, Kirchspiel', '5417'],
  ['Garding, Stadt', '5417'],
  ['Gaushorn', '5169'],
  ['Geesthacht, Stadt', '0032'],
  ['Gelting', '5990'],
  ['Geltorf', '5915'],
  ['Geschendorf', '5086'],
  ['Gettorf', '5824'],
  ['Giekau', '5727'],
  ['Giesensdorf', '5358'],
  ['Glasau', '5086'],
  ['Glinde, Stadt', '0018'],
  ['Glücksburg (Ostsee), Stadt', '0113'],
  ['Glückstadt, Stadt', '0029'],
  ['Glüsing', '5169'],
  ['Gnutz', '5864'],
  ['Göhl', '5543'],
  ['Gokels', '5895'],
  ['Goldebek', '5494'],
  ['Goldelund', '5494'],
  ['Göldenitz', '5308'],
  ['Goltoft', '5987'],
  ['Gönnebek', '5024'],
  ['Goosefeld', '5893'],
  ['Göttin', '5318'],
  ['Grabau', '5373'],
  ['Grabau', '5207'],
  ['Grambek', '5313'],
  ['Grande', '5270'],
  ['Grauel', '5895'],
  ['Grebin', '5739'],
  ['Gremersdorf', '5543'],
  ['Grevenkop', '5153'],
  ['Grevenkrug', '5889'],
  ['Gribbohm', '5168'],
  ['Grinau', '5391'],
  ['Gröde', '5459'],
  ['Grödersby', '5920'],
  ['Grömitz', '0016'],
  ['Grönwohld', '5270'],
  ['Groß Boden', '5391'],
  ['Groß Buchwald', '5889'],
  ['Groß Disnack', '5358'],
  ['Groß Grönau', '5358'],
  ['Groß Kummerfeld', '5063'],
  ['Groß Niendorf', '5053'],
  ['Groß Nordende', '5690'],
  ['Groß Offenseth-Aspern', '5660'],
  ['Groß Pampau', '5373'],
  ['Groß Rheide', '5996'],
  ['Groß Rönnau', '5086'],
  ['Groß Sarau', '5358'],
  ['Groß Schenkenberg', '5391'],
  ['Groß Vollstedt', '5864'],
  ['Groß Wittensee', '5890'],
  ['Großbarkau', '5747'],
  ['Großenaspe', '5005'],
  ['Großenbrode', '5543'],
  ['Großenrade', '5163'],
  ['Großensee', '5270'],
  ['Großenwiehe', '5952'],
  ['Großhansdorf', '0023'],
  ['Großharrie', '5785'],
  ['Großsolt', '5919'],
  ['Grothusenkoog', '5417'],
  ['Grove', '5373'],
  ['Groven', '5169'],
  ['Grube', '0018'],
  ['Grundhof', '5937'],
  ['Güby', '5893'],
  ['Gudendorf', '5175'],
  ['Gudow', '5318'],
  ['Gülzow', '5373'],
  ['Güster', '5318'],
  ['Haale', '5853'],
  ['Haby', '5890'],
  ['Hadenfeld', '5168'],
  ['Hagen', '5005'],
  ['Hallig Hooge', '5459'],
  ['Halstenbek', '0018'],
  ['Hamberge', '5244'],
  ['Hamdorf', '5847'],
  ['Hamfelde', '5373'],
  ['Hamfelde', '5270'],
  ['Hammoor', '5218'],
  ['Hamwarde', '5323'],
  ['Hamweddel', '5853'],
  ['Handewitt', '0183'],
  ['Hanerau-Hademarschen', '5895'],
  ['Hardebek', '5005'],
  ['Harmsdorf', '5358'],
  ['Harmsdorf', '5546'],
  ['Harrislee', '0120'],
  ['Hartenholm', '5043'],
  ['Haselau', '5690'],
  ['Haseldorf', '5690'],
  ['Haselund', '5453'],
  ['Hasenkrug', '5005'],
  ['Hasenmoor', '5043'],
  ['Hasloh', '0021'],
  ['Hasselberg', '5990'],
  ['Haßmoor', '5888'],
  ['Hattstedt', '5492'],
  ['Hattstedtermarsch', '5492'],
  ['Havekost', '5373'],
  ['Havetoft', '5987'],
  ['Hedwigenkoog', '5178'],
  ['Heede', '5660'],
  ['Heide, Stadt', '0044'],
  ['Heidekamp', '5244'],
  ['Heidgraben', '5690'],
  ['Heidmoor', '5005'],
  ['Heidmühlen', '5063'],
  ['Heikendorf', '5782'],
  ['Heiligenhafen, Stadt', '0021'],
  ['Heiligenstedten', '5138'],
  ['Heiligenstedtenerkamp', '5138'],
  ['Heilshoop', '5244'],
  ['Heinkenborstel', '5895'],
  ['Heist', '5690'],
  ['Helgoland', '0025'],
  ['Hellschen-Heringsand-Unterschaar', '5178'],
  ['Helmstorf', '5727'],
  ['Helse', '5166'],
  ['Hemdingen', '5660'],
  ['Hemme', '5169'],
  ['Hemmingstedt', '5172'],
  ['Hennstedt', '5169'],
  ['Hennstedt', '5189'],
  ['Henstedt-Ulzburg', '0039'],
  ['Heringsdorf', '5543'],
  ['Herzhorn', '5134'],
  ['Hetlingen', '5690'],
  ['Hillgroven', '5178'],
  ['Hingstheide', '5189'],
  ['Hitzhusen', '5005'],
  ['Hochdonn', '5163'],
  ['Hodorf', '5138'],
  ['Hoffeld', '5889'],
  ['Högel', '5494'],
  ['Högersdorf', '5053'],
  ['Högsdorf', '5727'],
  ['Hohenaspe', '5138'],
  ['Hohenfelde', '5134'],
  ['Hohenfelde', '5270'],
  ['Hohenfelde', '5727'],
  ['Hohenhorn', '5323'],
  ['Hohenlockstedt', '5189'],
  ['Hohenwestedt', '5895'],
  ['Hohn', '5847'],
  ['Höhndorf', '5755'],
  ['Hohwacht (Ostsee)', '5727'],
  ['Hoisdorf', '5262'],
  ['Hollenbek', '5358'],
  ['Hollingstedt', '5169'],
  ['Hollingstedt', '5993'],
  ['Holm', '5489'],
  ['Holm', '5690'],
  ['Holstenniendorf', '5168'],
  ['Holt', '5952'],
  ['Holtsee', '5890'],
  ['Holzbunge', '5890'],
  ['Holzdorf', '5893'],
  ['Honigsee', '5747'],
  ['Hornbek', '5313'],
  ['Hörnum (Sylt)', '5439'],
  ['Horst', '5358'],
  ['Horst (Holstein)', '5134'],
  ['Horstedt', '5492'],
  ['Hörsten', '5853'],
  ['Hörup', '5952'],
  ['Hövede', '5169'],
  ['Hude', '5492'],
  ['Huje', '5138'],
  ['Hummelfeld', '5893'],
  ['Humptrup', '5489'],
  ['Hürup', '5919'],
  ['Husby', '5919'],
  ['Hüsby', '5993'],
  ['Husum, Stadt', '0056'],
  ['Hüttblek', '5048'],
  ['Hütten', '5890'],
  ['Idstedt', '5987'],
  ['Immenstedt', '5453'],
  ['Immenstedt', '5175'],
  ['Itzehoe, Stadt', '0046'],
  ['Itzstedt', '5034'],
  ['Jagel', '5915'],
  ['Jahrsdorf', '5895'],
  ['Janneby', '5912'],
  ['Jardelund', '5952'],
  ['Jerrishoe', '5912'],
  ['Jersbek', '5218'],
  ['Jevenstedt', '5853'],
  ['Joldelund', '5494'],
  ['Jörl', '5912'],
  ['Jübek', '5993'],
  ['Juliusburg', '5343'],
  ['Kaaks', '5138'],
  ['Kabelhorst', '5546'],
  ['Kaisborstel', '5168'],
  ['Kaiser-Wilhelm-Koog', '5166'],
  ['Kaltenkirchen, Stadt', '0044'],
  ['Kalübbe', '5739'],
  ['Kampen (Sylt)', '5439'],
  ['Kankelau', '5373'],
  ['Kappeln, Stadt', '0045'],
  ['Karby', '5893'],
  ['Karlum', '5489'],
  ['Karolinenkoog', '5169'],
  ['Kasseburg', '5373'],
  ['Kasseedorf', '5591'],
  ['Kastorf', '5308'],
  ['Katharinenheerd', '5417'],
  ['Kattendorf', '5048'],
  ['Kayhude', '5034'],
  ['Kellenhusen (Ostsee)', '0025'],
  ['Kellinghusen, Stadt', '5189'],
  ['Kiebitzreihe', '5134'],
  ['Kiel, Landeshauptstadt', '0000'],
  ['Kirchbarkau', '5747'],
  ['Kirchnüchel', '5727'],
  ['Kisdorf', '5048'],
  ['Kittlitz', '5358'],
  ['Klamp', '5727'],
  ['Klanxbüll', '5489'],
  ['Klappholz', '5987'],
  ['Klein Barkau', '5747'],
  ['Klein Bennebek', '5996'],
  ['Klein Gladebrügge', '5086'],
  ['Klein Nordende', '5616'],
  ['Klein Offenseth-Sparrieshoop', '5616'],
  ['Klein Pampau', '5318'],
  ['Klein Rheide', '5996'],
  ['Klein Rönnau', '5086'],
  ['Klein Wesenberg', '5244'],
  ['Klein Wittensee', '5890'],
  ['Klein Zecher', '5358'],
  ['Klempau', '5308'],
  ['Kletkamp', '5727'],
  ['Kleve', '5169'],
  ['Kleve', '5138'],
  ['Klinkrade', '5391'],
  ['Klixbüll', '5489'],
  ['Koberg', '5391'],
  ['Köhn', '5755'],
  ['Koldenbüttel', '5492'],
  ['Kolkerheide', '5494'],
  ['Kollmar', '5134'],
  ['Kollmoor', '5104'],
  ['Kölln-Reisiek', '5616'],
  ['Kollow', '5373'],
  ['Königshügel', '5847'],
  ['Kosel', '5893'],
  ['Köthel', '5373'],
  ['Köthel', '5270'],
  ['Kotzenbüll', '5417'],
  ['Krempdorf', '5134'],
  ['Krempe, Stadt', '5153'],
  ['Krempel', '5169'],
  ['Kremperheide', '5153'],
  ['Krempermoor', '5153'],
  ['Krems II', '5086'],
  ['Krogaspe', '5864'],
  ['Krokau', '5755'],
  ['Kronprinzenkoog', '5166'],
  ['Kronsgaard', '5990'],
  ['Kronshagen', '0092'],
  ['Kronsmoor', '5104'],
  ['Kropp', '5996'],
  ['Kröppelshagen-Fahrendorf', '5323'],
  ['Krukow', '5343'],
  ['Krummbek', '5755'],
  ['Krummendiek', '5138'],
  ['Krummesse', '5308'],
  ['Krummwisch', '5803'],
  ['Krumstedt', '5175'],
  ['Krüzen', '5343'],
  ['Kuddewörde', '5373'],
  ['Kuden', '5163'],
  ['Kudensee', '5179'],
  ['Kühren', '5747'],
  ['Kühsen', '5391'],
  ['Kükels', '5053'],
  ['Kulpin', '5358'],
  ['Kummerfeld', '5687'],
  ['Labenz', '5391'],
  ['Laboe', '5755'],
  ['Ladelund', '5489'],
  ['Lägerdorf', '5104'],
  ['Lammershagen', '5775'],
  ['Landrecht', '5179'],
  ['Landscheide', '5179'],
  ['Langballig', '5937'],
  ['Langeln', '5660'],
  ['Langeneß', '5459'],
  ['Langenhorn', '5494'],
  ['Langenlehsten', '5318'],
  ['Langstedt', '5912'],
  ['Langwedel', '5864'],
  ['Lankau', '5391'],
  ['Lanze', '5343'],
  ['Lasbek', '5207'],
  ['Latendorf', '5063'],
  ['Lauenburg/ Elbe, Stadt', '0083'],
  ['Lebrade', '5739'],
  ['Leck', '5489'],
  ['Leezen', '5053'],
  ['Lehe', '5169'],
  ['Lehmkuhlen', '5747'],
  ['Lehmrade', '5313'],
  ['Lensahn', '5546'],
  ['Lentföhrden', '5043'],
  ['Lexgaard', '5489'],
  ['Lieth', '5172'],
  ['Linau', '5391'],
  ['Lindau', '5824'],
  ['Linden', '5169'],
  ['Lindewitt', '5952'],
  ['List auf Sylt', '5439'],
  ['Lockstedt', '5189'],
  ['Lohbarbek', '5138'],
  ['Lohe-Föhrden', '5847'],
  ['Lohe-Rickelshof', '5172'],
  ['Loit', '5974'],
  ['Looft', '5168'],
  ['Loop', '5889'],
  ['Loose', '5893'],
  ['Löptin', '5747'],
  ['Lottorf', '5915'],
  ['Löwenstedt', '5453'],
  ['Lübeck, Hansestadt', '0000'],
  ['Lüchow', '5391'],
  ['Luhnstedt', '5853'],
  ['Lunden', '5169'],
  ['Lürschau', '5993'],
  ['Lütau', '5343'],
  ['Lütjenburg, Stadt', '5727'],
  ['Lütjenholm', '5494'],
  ['Lütjensee', '5270'],
  ['Lütjenwestedt', '5895'],
  ['Lutterbek', '5755'],
  ['Lutzhorn', '5660'],
  ['Maasbüll', '5919'],
  ['Maasholm', '5990'],
  ['Malente', '0028'],
  ['Manhagen', '5546'],
  ['Marne, Stadt', '5166'],
  ['Marnerdeich', '5166'],
  ['Martensrade', '5775'],
  ['Mechow', '5358'],
  ['Meddewade', '5207'],
  ['Medelby', '5952'],
  ['Meezen', '5895'],
  ['Meggerdorf', '5996'],
  ['Mehlbek', '5138'],
  ['Meldorf, Stadt', '5175'],
  ['Melsdorf', '5803'],
  ['Meyn', '5952'],
  ['Midlum', '5488'],
  ['Mielkendorf', '5859'],
  ['Mildstedt', '5492'],
  ['Mittelangeln', '5949'],
  ['Möhnsen', '5373'],
  ['Mohrkirch', '5974'],
  ['Molfsee', '5859'],
  ['Mölln, Stadt', '0090'],
  ['Mönkeberg', '5782'],
  ['Mönkhagen', '5244'],
  ['Mönkloh', '5005'],
  ['Moordiek', '5104'],
  ['Moorhusen', '5138'],
  ['Moorrege', '5690'],
  ['Mörel', '5895'],
  ['Mözen', '5053'],
  ['Mucheln', '5775'],
  ['Mühbrook', '5889'],
  ['Mühlenbarbek', '5189'],
  ['Mühlenrade', '5373'],
  ['Munkbrarup', '5937'],
  ['Münsterdorf', '5104'],
  ['Müssen', '5318'],
  ['Mustin', '5358'],
  ['Nahe', '5034'],
  ['Nebel', '5488'],
  ['Negenharrie', '5889'],
  ['Negernbötel', '5086'],
  ['Nehms', '5086'],
  ['Nehmten', '5739'],
  ['Neritz', '5207'],
  ['Nettelsee', '5747'],
  ['Neu Duvenstedt', '5890'],
  ['Neuberend', '5987'],
  ['Neudorf-Bornstein', '5824'],
  ['Neuenbrook', '5153'],
  ['Neuendeich', '5690'],
  ['Neuendorf b. Elmshorn', '5134'],
  ['Neuendorf-Sachsenbande', '5179'],
  ['Neuengörs', '5086'],
  ['Neuenkirchen', '5172'],
  ['Neufeld', '5166'],
  ['Neufelderkoog', '5166'],
  ['Neukirchen', '5489'],
  ['Neukirchen', '5543'],
  ['Neumünster, Stadt', '0000'],
  ['Neustadt in Holstein, Stadt', '0032'],
  ['Neuwittenbek', '5824'],
  ['Neversdorf', '5053'],
  ['Nieblum', '5488'],
  ['Niebüll, Stadt', '5489'],
  ['Nieby', '5990'],
  ['Nienborstel', '5895'],
  ['Nienbüttel', '5168'],
  ['Niendorf bei Berkenthin', '5308'],
  ['Niendorf/ Stecknitz', '5313'],
  ['Nienwohld', '5218'],
  ['Niesgrau', '5990'],
  ['Nindorf', '5895'],
  ['Nindorf', '5175'],
  ['Noer', '5822'],
  ['Norddeich', '5178'],
  ['Norddorf auf Amrum', '5488'],
  ['Norderbrarup', '5974'],
  ['Norderfriedrichskoog', '5417'],
  ['Norderheistedt', '5169'],
  ['Nordermeldorf', '5175'],
  ['Norderstapel', '5996'],
  ['Norderstedt, Stadt', '0063'],
  ['Norderwöhrden', '5172'],
  ['Nordhackstedt', '5952'],
  ['Nordhastedt', '5172'],
  ['Nordstrand', '5492'],
  ['Norstedt', '5453'],
  ['Nortorf', '5179'],
  ['Nortorf, Stadt', '5864'],
  ['Nottfeld', '5974'],
  ['Nübbel', '5833'],
  ['Nübel', '5987'],
  ['Nusse', '5391'],
  ['Nutteln', '5168'],
  ['Nützen', '5043'],
  ['Ockholm', '5494'],
  ['Odderade', '5175'],
  ['Oelixdorf', '5104'],
  ['Oering', '5034'],
  ['Oersberg', '5920'],
  ['Oersdorf', '5048'],
  ['Oeschebüttel', '5189'],
  ['Oesterdeichstrich', '5178'],
  ['Oesterwurth', '5178'],
  ['Oevenum', '5488'],
  ['Oeversee', '5940'],
  ['Offenbüttel', '5175'],
  ['Oldenborstel', '5168'],
  ['Oldenburg in Holstein, Stadt', '0033'],
  ['Oldenbüttel', '5895'],
  ['Oldendorf', '5138'],
  ['Oldenhütten', '5864'],
  ['Oldenswort', '5417'],
  ['Oldersbek', '5492'],
  ['Olderup', '5492'],
  ['Oldsum', '5488'],
  ['Osdorf', '5824'],
  ['Ostenfeld (Husum)', '5492'],
  ['Ostenfeld (Rendsburg)', '5888'],
  ['Oster-Ohrstedt', '5453'],
  ['Osterby', '5952'],
  ['Osterby', '5890'],
  ['Osterhever', '5417'],
  ['Osterhorn', '5636'],
  ['Osterrade', '5175'],
  ['Osterrönfeld', '5888'],
  ['Osterstedt', '5895'],
  ['Ostrohe', '5172'],
  ['Oststeinbek', '0053'],
  ['Ottenbüttel', '5138'],
  ['Ottendorf', '5803'],
  ['Owschlag', '5890'],
  ['Padenstedt', '5895'],
  ['Pahlen', '5169'],
  ['Panker', '5727'],
  ['Panten', '5391'],
  ['Passade', '5755'],
  ['Peissen', '5138'],
  ['Pellworm', '5459'],
  ['Pinneberg, Stadt', '0039'],
  ['Plön, Stadt', '0057'],
  ['Pogeez', '5358'],
  ['Poggensee', '5391'],
  ['Pohnsdorf', '5747'],
  ['Pölitz', '5207'],
  ['Pommerby', '5990'],
  ['Poppenbüll', '5417'],
  ['Pöschendorf', '5168'],
  ['Postfeld', '5747'],
  ['Poyenberg', '5189'],
  ['Prasdorf', '5755'],
  ['Preetz, Stadt', '0062'],
  ['Prinzenmoor', '5847'],
  ['Prisdorf', '5687'],
  ['Probsteierhagen', '5755'],
  ['Pronstorf', '5086'],
  ['Puls', '5168'],
  ['Quarnbek', '5803'],
  ['Quarnstedt', '5189'],
  ['Quickborn', '5163'],
  ['Quickborn, Stadt', '0041'],
  ['Raa-Besenbek', '5616'],
  ['Rabel', '5990'],
  ['Rabenholz', '5990'],
  ['Rabenkirchen-Faulück', '5920'],
  ['Rade', '5189'],
  ['Rade b. Hohenwestedt', '5895'],
  ['Rade b. Rendsburg', '5888'],
  ['Ramhusen', '5166'],
  ['Ramstedt', '5492'],
  ['Rantrum', '5492'],
  ['Rantzau', '5739'],
  ['Rastorf', '5747'],
  ['Ratekau', '0035'],
  ['Rathjensdorf', '5739'],
  ['Ratzeburg, Stadt', '0100'],
  ['Rausdorf', '5270'],
  ['Reesdorf', '5889'],
  ['Reher', '5168'],
  ['Rehhorst', '5244'],
  ['Rehm-Flehde-Bargen', '5169'],
  ['Reinbek, Stadt', '0060'],
  ['Reinfeld (Holstein), Stadt', '0061'],
  ['Reinsbüttel', '5178'],
  ['Rellingen', '0043'],
  ['Remmels', '5895'],
  ['Rendsburg, Stadt', '0135'],
  ['Rendswühren', '5785'],
  ['Rethwisch', '5153'],
  ['Rethwisch', '5207'],
  ['Reußenköge', '0108'],
  ['Rickert', '5833'],
  ['Rickling', '5063'],
  ['Riepsdorf', '5546'],
  ['Rieseby', '5893'],
  ['Ringsberg', '5937'],
  ['Risum-Lindholm', '5489'],
  ['Ritzerau', '5391'],
  ['Rodenäs', '5489'],
  ['Rodenbek', '5859'],
  ['Rohlstorf', '5086'],
  ['Römnitz', '5358'],
  ['Rondeshagen', '5308'],
  ['Rosdorf', '5189'],
  ['Roseburg', '5318'],
  ['Rügge', '5974'],
  ['Ruhwinkel', '5785'],
  ['Rumohr', '5859'],
  ['Rümpel', '5207'],
  ['Sachsenwald (Forstgutsbez.)', '9105'],
  ['Sahms', '5373'],
  ['Salem', '5358'],
  ['Sandesneben', '5391'],
  ['Sankt Annen', '5169'],
  ['Sankt Margarethen', '5179'],
  ['Sankt Michaelisdonn', '5163'],
  ['Sankt Peter-Ording', '5417'],
  ['Sarlhusen', '5189'],
  ['Sarzbüttel', '5175'],
  ['Saustrup', '5974'],
  ['Schaalby', '5987'],
  ['Schacht-Audorf', '5888'],
  ['Schackendorf', '5086'],
  ['Schafflund', '5952'],
  ['Schafstedt', '5175'],
  ['Schalkholz', '5169'],
  ['Scharbeutz', '0044'],
  ['Schashagen', '5591'],
  ['Scheggerott', '5974'],
  ['Schellhorn', '5747'],
  ['Schenefeld', '5168'],
  ['Schenefeld, Stadt', '0044'],
  ['Schieren', '5086'],
  ['Schierensee', '5859'],
  ['Schillsdorf', '5785'],
  ['Schinkel', '5824'],
  ['Schiphorst', '5391'],
  ['Schlesen', '5775'],
  ['Schleswig, Stadt', '0075'],
  ['Schlichting', '5169'],
  ['Schlotfeld', '5138'],
  ['Schmalensee', '5024'],
  ['Schmalfeld', '5043'],
  ['Schmalstede', '5889'],
  ['Schmedeswurth', '5166'],
  ['Schmilau', '5358'],
  ['Schnakenbek', '5343'],
  ['Schnarup-Thumby', '5949'],
  ['Schönbek', '5889'],
  ['Schönberg', '5391'],
  ['Schönberg (Holstein)', '5755'],
  ['Schönhorst', '5830'],
  ['Schönkirchen', '5782'],
  ['Schönwalde am Bungsberg', '5591'],
  ['Schretstaken', '5313'],
  ['Schrum', '5175'],
  ['Schuby', '5993'],
  ['Schulendorf', '5318'],
  ['Schülldorf', '5888'],
  ['Schülp', '5178'],
  ['Schülp b. Nortorf', '5864'],
  ['Schülp b. Rendsburg', '5853'],
  ['Schürensöhlen', '5391'],
  ['Schwabstedt', '5492'],
  ['Schwartbuck', '5727'],
  ['Schwarzenbek, Stadt', '0116'],
  ['Schwedeneck', '5822'],
  ['Schwentinental, Stadt', '0091'],
  ['Schwesing', '5453'],
  ['Schwissel', '5053'],
  ['Seedorf', '5358'],
  ['Seedorf', '5086'],
  ['Seefeld', '5895'],
  ['Seester', '5616'],
  ['Seestermühe', '5616'],
  ['Seeth', '5492'],
  ['Seeth-Ekholt', '5616'],
  ['Sehestedt', '5890'],
  ['Selent', '5775'],
  ['Selk', '5915'],
  ['Seth', '5034'],
  ['Siebenbäumen', '5391'],
  ['Siebeneichen', '5318'],
  ['Siek', '5262'],
  ['Sierksdorf', '5591'],
  ['Sierksrade', '5308'],
  ['Sievershütten', '5048'],
  ['Sieverstedt', '5940'],
  ['Silberstedt', '5993'],
  ['Silzen', '5138'],
  ['Simonsberg', '5492'],
  ['Sirksfelde', '5391'],
  ['Sollerup', '5912'],
  ['Sollwitt', '5453'],
  ['Sommerland', '5134'],
  ['Sönnebüll', '5494'],
  ['Sophienhamm', '5847'],
  ['Sören', '5889'],
  ['Sörup', '5949'],
  ['Sprakebüll', '5489'],
  ['Stadum', '5489'],
  ['Stafstedt', '5853'],
  ['Stakendorf', '5755'],
  ['Stangheck', '5990'],
  ['Stapelfeld', '5262'],
  ['Stedesand', '5489'],
  ['Steenfeld', '5895'],
  ['Stein', '5755'],
  ['Steinberg', '5990'],
  ['Steinbergkirche', '5990'],
  ['Steinburg', '5207'],
  ['Steinfeld', '5974'],
  ['Steinhorst', '5391'],
  ['Stelle-Wittenwurth', '5172'],
  ['Sterley', '5358'],
  ['Sterup', '5990'],
  ['Stipsdorf', '5086'],
  ['Stockelsdorf', '0040'],
  ['Stocksee', '5024'],
  ['Stolk', '5987'],
  ['Stolpe', '5785'],
  ['Stoltebüll', '5990'],
  ['Stoltenberg', '5755'],
  ['Stördorf', '5179'],
  ['Störkathen', '5189'],
  ['Strande', '5822'],
  ['Strübbel', '5178'],
  ['Struckum', '5494'],
  ['Strukdorf', '5086'],
  ['Struvenhütten', '5048'],
  ['Struxdorf', '5987'],
  ['Stubben', '5391'],
  ['Stuvenborn', '5048'],
  ['Süderau', '5153'],
  ['Süderbrarup', '5974'],
  ['Süderdeich', '5178'],
  ['Süderdorf', '5169'],
  ['Süderende', '5488'],
  ['Süderfahrenstedt', '5987'],
  ['Süderhackstedt', '5912'],
  ['Süderhastedt', '5163'],
  ['Süderheistedt', '5169'],
  ['Süderhöft', '5492'],
  ['Süderlügum', '5489'],
  ['Südermarsch', '5492'],
  ['Süderstapel', '5996'],
  ['Sülfeld', '5034'],
  ['Süsel', '0041'],
  ['Sylt', '0168'],
  ['Taarstedt', '5987'],
  ['Tackesdorf', '5895'],
  ['Talkau', '5313'],
  ['Tangstedt', '0076'],
  ['Tangstedt', '5687'],
  ['Tappendorf', '5895'],
  ['Tarbek', '5024'],
  ['Tarp', '5940'],
  ['Tasdorf', '5785'],
  ['Tastrup', '5919'],
  ['Tating', '5417'],
  ['Techelsdorf', '5830'],
  ['Tellingstedt', '5169'],
  ['Tensbüttel-Röst', '5175'],
  ['Tensfeld', '5024'],
  ['Tetenbüll', '5417'],
  ['Tetenhusen', '5996'],
  ['Thaden', '5895'],
  ['Thumby', '5893'],
  ['Tielen', '5996'],
  ['Tielenhemme', '5169'],
  ['Timmaspe', '5864'],
  ['Timmendorfer Strand', '0042'],
  ['Tinningstedt', '5489'],
  ['Todenbüttel', '5895'],
  ['Todendorf', '5218'],
  ['Todesfelde', '5053'],
  ['Tolk', '5987'],
  ['Tönning, Stadt', '0138'],
  ['Tornesch, Stadt', '0048'],
  ['Tramm', '5318'],
  ['Trappenkamp', '5024'],
  ['Travenbrück', '5207'],
  ['Travenhorst', '5086'],
  ['Traventhal', '5086'],
  ['Treia', '5993'],
  ['Tremsbüttel', '5218'],
  ['Trennewurth', '5166'],
  ['Trittau', '5270'],
  ['Tröndel', '5727'],
  ['Tümlauer Koog', '5417'],
  ['Tüttendorf', '5824'],
  ['Twedt', '5987'],
  ['Uelsby', '5987'],
  ['Uelvesbüll', '5492'],
  ['Uetersen, Stadt', '0049'],
  ['Ulsnis', '5974'],
  ['Uphusum', '5489'],
  ['Utersum', '5488'],
  ['Vaale', '5168'],
  ['Vaalermoor', '5168'],
  ['Viöl', '5453'],
  ['Vollerwiek', '5417'],
  ['Vollstedt', '5494'],
  ['Volsemenhusen', '5166'],
  ['Waabs', '5893'],
  ['Wacken', '5168'],
  ['Wagersrott', '5974'],
  ['Wahlstedt, Stadt', '0092'],
  ['Wahlstorf', '5747'],
  ['Wakendorf I', '5086'],
  ['Wakendorf II', '5048'],
  ['Walksfelde', '5391'],
  ['Wallen', '5169'],
  ['Wallsbüll', '5952'],
  ['Wanderup', '5912'],
  ['Wangelau', '5343'],
  ['Wangels', '5543'],
  ['Wankendorf', '5785'],
  ['Wapelfeld', '5895'],
  ['Warder', '5864'],
  ['Warnau', '5747'],
  ['Warringholz', '5168'],
  ['Warwerort', '5178'],
  ['Wasbek', '0169'],
  ['Wattenbek', '5889'],
  ['Weddelbrook', '5005'],
  ['Weddingstedt', '5172'],
  ['Wedel, Stadt', '0050'],
  ['Weede', '5086'],
  ['Wees', '5937'],
  ['Weesby', '5952'],
  ['Welmbüttel', '5169'],
  ['Welt', '5417'],
  ['Wendtorf', '5755'],
  ['Wennbüttel', '5175'],
  ['Wenningstedt-Braderup (Sylt)', '5439'],
  ['Wensin', '5086'],
  ['Wentorf (Amt Sandesneben)', '5391'],
  ['Wentorf bei Hamburg', '0129'],
  ['Wesenberg', '5244'],
  ['Wesselburen, Stadt', '5178'],
  ['Wesselburener Deichhausen', '5178'],
  ['Wesselburenerkoog', '5178'],
  ['Wesseln', '5172'],
  ['Westensee', '5803'],
  ['Wester-Ohrstedt', '5453'],
  ['Westerau', '5244'],
  ['Westerborstel', '5169'],
  ['Westerdeichstrich', '5178'],
  ['Westerhever', '5417'],
  ['Westerholz', '5937'],
  ['Westerhorn', '5636'],
  ['Westermoor', '5104'],
  ['Westerrade', '5086'],
  ['Westerrönfeld', '5853'],
  ['Westre', '5489'],
  ['Wewelsfleth', '5179'],
  ['Wiedenborstel', '5189'],
  ['Wiemersdorf', '5005'],
  ['Wiemerstedt', '5169'],
  ['Wiershop', '5323'],
  ['Willenscharen', '5189'],
  ['Wilster, Stadt', '0113'],
  ['Windbergen', '5175'],
  ['Windeby', '5893'],
  ['Winnemark', '5893'],
  ['Winnert', '5492'],
  ['Winseldorf', '5138'],
  ['Winsen', '5048'],
  ['Wisch', '5492'],
  ['Wisch', '5755'],
  ['Witsum', '5488'],
  ['Wittbek', '5492'],
  ['Wittdün auf Amrum', '5488'],
  ['Wittenbergen', '5104'],
  ['Wittenborn', '5053'],
  ['Wittmoldt', '5739'],
  ['Witzeeze', '5318'],
  ['Witzhave', '5270'],
  ['Witzwort', '5492'],
  ['Wobbenbüll', '5492'],
  ['Wohlde', '5996'],
  ['Wohltorf', '5323'],
  ['Wöhrden', '5172'],
  ['Wolmersdorf', '5175'],
  ['Woltersdorf', '5313'],
  ['Worth', '5323'],
  ['Wrist', '5189'],
  ['Wrixum', '5488'],
  ['Wrohm', '5169'],
  ['Wulfsmoor', '5189'],
  ['Wyk auf Föhr, Stadt', '5488'],
  ['Zarpen', '5244'],
  ['Ziethen', '5358'],
];

const AEMTER = [
  ['Achterwehr', '5803'],
  ['Ahrensbök', '0001'],
  ['Ahrensburg, Stadt', '0001'],
  ['Altenholz', '0005'],
  ['Ammersbek', '0090'],
  ['Amt Lütjenburg', '5727'],
  ['Amt Mittelangeln', '5949'],
  ['Arensharde', '5993'],
  ['Ascheberg (Holstein)', '0001'],
  ['Bad Bramstedt-Land', '5005'],
  ['Bad Bramstedt, Stadt', '0004'],
  ['Bad Oldesloe-Land', '5207'],
  ['Bad Oldesloe, Stadt', '0004'],
  ['Bad Schwartau, Stadt', '0004'],
  ['Bad Segeberg, Stadt', '0005'],
  ['Bargteheide-Land', '5218'],
  ['Bargteheide, Stadt', '0006'],
  ['Barmstedt, Stadt', '0002'],
  ['Barsbüttel', '0009'],
  ['Berkenthin', '5308'],
  ['Bokhorst-Wankendorf', '5785'],
  ['Bönebüttel', '0008'],
  ['Bönningstedt', '0005'],
  ['Boostedt-Rickling', '5063'],
  ['Bordesholm', '5889'],
  ['Bornhöved', '5024'],
  ['Bosau', '0007'],
  ['Bösdorf', '0009'],
  ['Breitenburg', '5104'],
  ['Breitenfelde', '5313'],
  ['Brunsbüttel, Stadt', '0011'],
  ['Büchen', '5318'],
  ['Buchholz (Forstgutsbez.)', '9014'],
  ['Büdelsdorf, Stadt', '0034'],
  ['Burg-St. Michaelisdonn', '5163'],
  ['Büsum-Wesselburen', '5178'],
  ['Dahme', '0010'],
  ['Dänischenhagen', '5822'],
  ['Dänischer Wohld', '5824'],
  ['Eckernförde, Stadt', '0043'],
  ['Eggebek', '5912'],
  ['Eider', '5169'],
  ['Eiderkanal', '5888'],
  ['Eiderstedt', '5417'],
  ['Ellerau', '0019'],
  ['Elmshorn-Land', '5616'],
  ['Elmshorn, Stadt', '0015'],
  ['Eutin, Stadt', '0012'],
  ['Fehmarn, Stadt', '0046'],
  ['Flensburg, Stadt', '0000'],
  ['Flintbek', '5830'],
  ['Fockbek', '5833'],
  ['Föhr-Amrum', '5488'],
  ['Friedrichstadt, Stadt', '0033'],
  ['Geest und Marsch Südholstein', '5690'],
  ['Geesthacht, Stadt', '0032'],
  ['Geltinger Bucht', '5990'],
  ['Glinde, Stadt', '0018'],
  ['Glücksburg (Ostsee), Stadt', '0113'],
  ['Glückstadt, Stadt', '0029'],
  ['Grömitz', '0016'],
  ['Großer Plöner See', '5739'],
  ['Großhansdorf', '0023'],
  ['Grube', '0018'],
  ['Haddeby', '5915'],
  ['Halstenbek', '0018'],
  ['Handewitt', '0183'],
  ['Harrislee', '0120'],
  ['Hasloh', '0021'],
  ['Heide, Stadt', '0044'],
  ['Heider Umland', '5172'],
  ['Heiligenhafen, Stadt', '0021'],
  ['Helgoland', '0025'],
  ['Henstedt-Ulzburg', '0039'],
  ['Hohe Elbgeest', '5323'],
  ['Hohner Harde', '5847'],
  ['Hörnerkirchen', '5636'],
  ['Horst-Herzhorn', '5134'],
  ['Hürup', '5919'],
  ['Husum, Stadt', '0056'],
  ['Hüttener Berge', '5890'],
  ['Itzehoe-Land', '5138'],
  ['Itzehoe, Stadt', '0046'],
  ['Itzstedt', '5034'],
  ['Jevenstedt', '5853'],
  ['Kaltenkirchen-Land', '5043'],
  ['Kaltenkirchen, Stadt', '0044'],
  ['Kappeln-Land', '5920'],
  ['Kappeln, Stadt', '0045'],
  ['Kellenhusen (Ostsee)', '0025'],
  ['Kellinghusen', '5189'],
  ['Kiel, Landeshauptstadt', '0000'],
  ['Kisdorf', '5048'],
  ['Krempermarsch', '5153'],
  ['Kronshagen', '0092'],
  ['Kropp-Stapelholm', '5996'],
  ['Landschaft Sylt', '5439'],
  ['Langballig', '5937'],
  ['Lauenburg/ Elbe, Stadt', '0083'],
  ['Lauenburgische Seen', '5358'],
  ['Leezen', '5053'],
  ['Lensahn', '5546'],
  ['Lübeck, Hansestadt', '0000'],
  ['Lütau', '5343'],
  ['Malente', '0028'],
  ['Marne-Nordsee', '5166'],
  ['Mitteldithmarschen', '5175'],
  ['Mittelholstein', '5895'],
  ['Mittleres Nordfriesland', '5494'],
  ['Molfsee', '5859'],
  ['Mölln, Stadt', '0090'],
  ['Neumünster, Stadt', '0000'],
  ['Neustadt in Holstein, Stadt', '0032'],
  ['Norderstedt, Stadt', '0063'],
  ['Nordsee-Treene', '5492'],
  ['Nordstormarn', '5244'],
  ['Nortorfer Land', '5864'],
  ['Oeversee', '5940'],
  ['Oldenburg in Holstein, Stadt', '0033'],
  ['Oldenburg-Land', '5543'],
  ['Ostholstein-Mitte', '5591'],
  ['Oststeinbek', '0053'],
  ['Pellworm', '5459'],
  ['Pinnau', '5687'],
  ['Pinneberg, Stadt', '0039'],
  ['Plön, Stadt', '0057'],
  ['Preetz-Land', '5747'],
  ['Preetz, Stadt', '0062'],
  ['Probstei', '5755'],
  ['Quickborn, Stadt', '0041'],
  ['Rantzau', '5660'],
  ['Ratekau', '0035'],
  ['Ratzeburg, Stadt', '0100'],
  ['Reinbek, Stadt', '0060'],
  ['Reinfeld (Holstein), Stadt', '0061'],
  ['Rellingen', '0043'],
  ['Rendsburg, Stadt', '0135'],
  ['Reußenköge', '0108'],
  ['Sachsenwald (Forstgutsbez.)', '9105'],
  ['Sandesneben-Nusse', '5391'],
  ['Schafflund', '5952'],
  ['Scharbeutz', '0044'],
  ['Schenefeld', '5168'],
  ['Schenefeld, Stadt', '0044'],
  ['Schlei-Ostsee', '5893'],
  ['Schleswig, Stadt', '0075'],
  ['Schrevenborn', '5782'],
  ['Schwarzenbek-Land', '5373'],
  ['Schwarzenbek, Stadt', '0116'],
  ['Schwentinental, Stadt', '0091'],
  ['Selent/ Schlesen', '5775'],
  ['Siek', '5262'],
  ['Stockelsdorf', '0040'],
  ['Südangeln', '5987'],
  ['Süderbrarup', '5974'],
  ['Südtondern', '5489'],
  ['Süsel', '0041'],
  ['Sylt', '0168'],
  ['Tangstedt', '0076'],
  ['Timmendorfer Strand', '0042'],
  ['Tönning, Stadt', '0138'],
  ['Tornesch, Stadt', '0048'],
  ['Trave-Land', '5086'],
  ['Trittau', '5270'],
  ['Uetersen, Stadt', '0049'],
  ['Viöl', '5453'],
  ['Wahlstedt, Stadt', '0092'],
  ['Wasbek', '0169'],
  ['Wedel, Stadt', '0050'],
  ['Wentorf bei Hamburg', '0129'],
  ['Wilster, Stadt', '0113'],
  ['Wilstermarsch', '5179'],
];

export { GEMEINDEN, AEMTER };
