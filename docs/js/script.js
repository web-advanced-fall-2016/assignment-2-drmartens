var studentIDArray = [];
var results = document.getElementById("resultsDiv");
var baseURL = 'http://148.75.251.185:8888';
var info = document.getElementById("information");



(function() {
    var searchResults = document.getElementById("searchResults");

    if (document.readyState != "loading") {
        app();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            app();
        }, false);
    }

    function app() {
        getStudentID();
        addEventListener();
        // let modal = new SimpleModal('mymodal');
        // setupProfileSubmissionForm();
    }

    function getStudentID() {
        let config = {
            method: 'GET',
            headers: new Headers({}),
        };

        let request = new Request(`${baseURL}/students`, config);
        fetch(request)
            .then(function(res) {
                if (res.status == 200)
                    return res.json();
                else
                    throw new Error('Something went wrong on api server!');
            })
            .then(function(res) {
                // populatestudentID(res);
                searchStudents(res);
                // console.log(res);
            })

        .catch(function(err) {
            console.warn(`Couldn't fetch students list`);
            console.log(err);
        });
    }


    function searchStudents(studentID) {
        let entryArray = studentID;
        console.log(entryArray);

        for (i = 0; i < entryArray.length; i++) {
            studentIDArray.push({ name: entryArray[i].first_name + " " + entryArray[i].last_name, id: entryArray[i].id });
        }
        console.log(studentIDArray);
    }


    function getMatches(key) {
        let results = [];
        if (!key) {
            return results;
        }
        let expression = new RegExp(key, 'i');
        for (item of studentIDArray) {
            if (expression.test(item.name)) {
                results.push(item);

            }

        }
        return results;
    }


    // //events

    function addEventListener() {
        var input = document.querySelector('input');
        input.addEventListener('input', handleInput, false);
        searchResults.addEventListener('click', function(evnt) {
            console.log(evnt.target.dataset.id);
            populateRecord(evnt.target.dataset.id);
        });

    }

    function handleInput(event) {
        let value = event.target.value;
        inputVal = value;
        console.log(inputVal);
        showResults();
    }


    //function to show the input in list
    function showResults() {


        var searchInput = document.getElementById('searchInput');

        if (inputVal.length > 0) {
            var showResults = [];
            searchResults.innerHTML = '';
            showResults = getMatches(inputVal);
            console.log(showResults);
            for (i = 0; i < showResults.length; i++) {
                searchResults.innerHTML += `<div class="resultItem" data-id=${showResults[i].id}><span class="listSpan">ID: ${showResults[i].id}:</span> ${showResults[i].name}</div>`;
            }
            if (showResults.length)
                searchResults.style.display = 'block';
            info.style.display = 'block';

        } else {
            searchResults.style.display = 'none';
            info.style.display = 'none';

        }


    }

    function populateRecord(selectedID) {
        console.log("this is the selected " + selectedID);

        let config = {
            method: 'GET',
            headers: new Headers({}),
        };
        0
        let request = new Request(`${baseURL}/students/${selectedID}`, config);
        fetch(request)
            .then(function(res) {
                if (res.status == 200)
                    return res.json();
                else
                    throw new Error('Something went wrong on api server!');
            })
            .then(function(res) {
                // populatestudentID(res);
                let info = res;

                let request = new Request(`${baseURL}/students/${selectedID}/bio`, config);
                fetch(request)
                    .then(function(res) {
                        if (res.status == 200)
                            return res.json();
                        else
                            throw new Error('Something went wrong on api server!');
                    })
                    .then(function(res) {
                        // populatestudentID(res);
                        info.full_bio = res.full_bio;
                        showInfo(info)
                            // console.log(res);
                    })


                .catch(function(err) {
                    console.warn(`Couldn't fetch students list`);
                    console.log(err);
                });

                // console.log(res);
            })


        .catch(function(err) {
            console.warn(`Couldn't fetch students list`);
            console.log(err);
        });



    }

})();

function showInfo(student) {

    // let name = document.getElementById("name");
    //     let tagline = document.getElementById('tagline');ff
    //     // let bio = document.getElementById('bio');
    //     let pic = document.getElementById('pic');
    //     let contentSection = document.getElementById('main');

    var linkArray = [];
    for (i = 0; i < student.links.length; i++) {
        linkArray.push(student.links[i]);
    }
    var wanted = "Touching themself in a dark movie theatre., Urinating on a stray cat., Wearing their comic-con outfit everyday for a week., Speaking in tongues at a community meeting., Being blatantly awkward 24/7., Sleeping on D12 in the nude., Leaving their child in the frozen foods section of Trade Joe's., Taking up three seats on the subway., Dressing up as a scary clown and standing outside local preschools., Tagging local churces with innapropriate self-portraits., Screaming 'The singularity is coming!' at a city council meeting., Breaking into a violent rage after not getting enough likes on their newest photo of their cat on Instagram.";
    var theCrime = wanted.split(',');

    var numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    var randomNum = numberArray[Math.floor(Math.random()*numberArray.length)]

    console.log(randomNum);

    if (linkArray.length < 2) {

        info.innerHTML = '<div id="wanted">WANTED</div><div id ="name">' + student.first_name + " " + student.last_name + '</div>' +
            '<div id = "pictureDiv">' + '<img id="pic" src="' + baseURL + student.profile_picture + '" />' + '</div>' +
            '<div id = "tagline">' + student.excerpt + '</div>' +
            '<div id = "crime"><span class ="bioSpan">Crime</span></br>' + theCrime[randomNum] + '</div>' +
            '<div id = "bio"><span class="bioSpan">Their M.O.</span></br>' + student.full_bio + '</div>' +
            
            '<div id = "links"><span class="linkSpan"> Find Them</span></br>' + '<a href="' + linkArray[0].url + '" target="_blank">' + '<img src="../img/target.png"/>' + '</a></br><a href="mailto:' + student.email + '" target="_blank"><img src="../img/mail.png"/></a></div>'
                    info.style.border = '3px solid white';

    } else if (linkArray.length < 3) {
        info.innerHTML = '<div id="wanted">WANTED</div><div id ="name">' + student.first_name + " " + student.last_name + '</div>' +
            '<div id = "pictureDiv">' + '<img id="pic" src="' + baseURL + student.profile_picture + '" />' + '</div>' +
            '<div id = "tagline">' + student.excerpt + '</div>' +
            '<div id = "crime"><span class ="bioSpan">Crime</span></br>' + theCrime[randomNum] + '</div>' +
            '<div id = "bio"><span class="bioSpan">Their M.O.</span></br>' + student.full_bio + '</div>' +
           

            '<div id = "links"><span class="linkSpan"> Find Them</span></br>' + '<a href="' + linkArray[0].url + '" target="_blank">' + '<img src="../img/target.png"/>' + '</a>' + ' <a href="' + linkArray[1].url + '" target="_blank">' + '<img src="../img/target.png"/>' + '</a></br><a href="mailto:' + student.email + '" target="_blank"><img src="../img/mail.png"/></a></div>';
               info.style.border = '3px solid white';

    } else if (linkArray.length < 4) {
        info.innerHTML = '<div id="wanted">WANTED</div><div id ="name">' + student.first_name + " " + student.last_name + '</div>' +
            '<div id = "pictureDiv">' + '<img id="pic" src="' + baseURL + student.profile_picture + '" />' + '</div>' +
            '<div id = "tagline">' + student.excerpt + '</div>' +
            '<div id = "crime"><span class ="bioSpan">Crime</span></br>' + theCrime[randomNum] + '</div>' +
            '<div id = "bio"><span class="bioSpan"> Their M.O.</span></br>' + student.full_bio + '</div>' +
            '<div id = "links"><span class="linkSpan"> Find Them</span></br>' + '<a href="' + linkArray[0].url + '" target="_blank">' + '<img src="../img/target.png"/>' + '</a>' + '     <a href="' + linkArray[1].url + '" target="_blank">' + '<img src="../img/target.png"/>' + '</a>' + '     <a href="' + linkArray[2].url + '" target="_blank">' + '<img src="../img/target.png"/>' + '</a></br><a href="mailto:' + student.email + '" target="_blank"><img src="../img/mail.png"/></a></div>';
                info.style.border = '3px solid white';

    }


    console.log(student.first_name);
    console.log(student.full_bio);


};

//   function getStudents() {
//         let config = {
//             method: 'GET',
//             headers: new Headers({}),
//         };

//         let request = new Request(`${baseURL}/students`, config);
//         fetch(request)
//             .then(function(res) {
//                 if (res.status == 200)
//                     return res.json();
//                 else
//                     throw new Error('Something went wrong on api server!');
//             })
//             .then(function(res) {
//                 for (let student of res) {
//                     let request = new Request(`${baseURL}/students/${student.id}`, config);
//                     fetch(request)
//                         .then(function(res) {
//                             if (res.status == 200)
//                                 return res.json();
//                             else
//                                 throw new Error('Something went wrong on api server!');
//                         })
//                         .then(function(res) {
//                             populateStudent(res);
//                         })
//                         .catch(function(err) {
//                             console.warn(`Couldn't fetch a student!`);
//                             console.log(err);
//                         });
//                 }
//             })
//             .catch(function(err) {
//                 console.warn(`Couldn't fetch students list`);
//                 console.log(err);
//             });
//     }


// function populateStudentID(studentID) {
//  for (id in studentID) {
//      studentIDArray.push (id);
//  }
//  console.log(studentIDArray;)
// }



//     function populateStudent(student) {
//         let studentArray = [];
//         let bioArray = [];

//         console.log(bioArray);

//         for (id in student.id) {
//             studentArray.push(id);
//             bioArray.push(bio);
//         }

//         console.log("the bio is" + bio);

//         console.log(studentArray);
//         console.log(student.id);

//         let name = document.getElementById("name");
//         let tagline = document.getElementById('tagline');
//         // let bio = document.getElementById('bio');
//         let pic = document.getElementById('pic');
//         let contentSection = document.getElementById('main');

//         main.innerHTML += '<div id ="name">' + student.first_name + " " + student.last_name + '</div>' + 
//         '<div id = "tagline">' + student.excerpt + '</div>' + 
//         '<div id = "pictureDiv">' + '<img id="pic" src="' + baseURL + student.profile_picture + '" />' + '</div>'
//         + '<div id = "bio">' + bio + '</div>' ;
//     }




// //Global Variables
// var names = "Jewell Munter:854370;Alden Ehrhard:852014;Chance Hunnewell:158189;Adriana Geffers:17473;Celia Schnieders:746599;Corliss Denk:791623;Sally Zehnpfennig:185749;Jayme Behrends:462289;Jesica Farmsworth:720507;Laree Chime:822125;Henrietta Chandsawangbh:400455;Regine Criado:593497;Louann Rull:437496;Raylene Bodell:230709;Lenora Heidorn:84678;Terica Bacote:53904;Dena Picket:584555;Laurie Arambuia:912065;Freeda Barbar:725347;Arlena Blenden:512319;Toshia Siaperas:623512;Randell Hassig:117809;Denise Litsey:461117;Ron Blankenbecler:147578;Quincy Wileman:626921;Cherish Patz:744193;Burma Erskin:5184;Arron Bulfer:803810;Tiny Pokorski:482737;Mitzie Hadef:253250;Genie Malys:421633;Robbin Steenburg:356368;Delsie Gallegos:76374;Kaycee Leone:924465;Lorna Komar:474375;Joie Warf:448658;Zana Philpot:710606;Caroline Koles:87033;Joey Heine:740998;Pilar Gividen:714223;Kesha Rushforth:157566;Phebe Yournet:979838;Casimira Wohlenhaus:244810;Glenda Prestridge:466791;Bianca Derienzo:510015;Earnest Lapage:888249;Argentina Arnoux:672254;Elva Wieto:786812;Tomi Kirgan:684709;Jacquelynn Drader:666873;Robert Dasen:449309;";
// var resultsDiv = document.getElementById("resultsDiv");

// var inputVal;
// var nameArray = [];
// var results;
// //Immediately Invoked Function that runs when DOM is ready

// (function() {
//  if (document.readyState != "loading") {
//      addEventListener();
//      var dictionary = new Dictionary(names,",",":");



//  } else {
//      document.addEventListener("DOMContentLoaded", function() {
//      //create instance with seperators I want to parse text by
//      addEventListener();
//      var dictionary = new Dictionary(names,",",":");

//      });

//  }

// })();


// //function to get input

// //function to sort dictionaroy

// function Dictionary (nameString, entryDelimiter, recordDelimiter){
//  let eD = entryDelimiter;
//  let rD = recordDelimiter;
//  let entryArray = nameString.split(eD);
//  // console.log(entryArray);

//  for (i=0;i<entryArray.length;i++) {
//      let tempHolder = entryArray[i].split(rD);
//      // console.log(tempHolder);
//      nameArray.push({name:tempHolder[0], id:tempHolder[1]});
//  }
// }

// function getMatches(key) {
//  let results = [];
//      if(!key) {
//          return results;
//      }

//      let expression = new RegExp(key, 'i');
//      for (item of studentIDList) {
//          if (expression.test(item.name)) {
//              results.push(item);
//          }
//      }

//      return results;
// }


// //events

// function addEventListener(){
//  var input = document.querySelector('input');
//  input.addEventListener('input',handleInput,false);
// }

// function handleInput(event) {
//  let value = event.target.value;
//  inputVal = value;
//  console.log(inputVal);
//  showResults();
// }


// //function to show the input in list
// function showResults() {
//  let inputArray = inputVal;
//  var searchResults = document.getElementById("searchResults");

//  if (inputArray.length > 0) {
//      var showResults = [];

//      searchResults.innerHTML = '';

//      showResults = getMatches(inputVal);
//      // console.log(showResults);
//      for (i=0;i<showResults.length;i++) {
//          searchResults.innerHTML += '<li>' + '<span id="listSpan">Rank: '+ showResults[i].id + ': </span> ' + showResults[i].name +  '</li>';
//          //+ '<img src = "iconPerson.png">' 
//      }
//      searchResults.style.display = 'block';
//  } else {
//      showResults = [];
//      searchResults.innerHTML = '';
//      // resultsDiv.innerHTML += '<img src ="http://www.iceflowstudios.com/v3/wp-content/uploads/2013/01/LoadingCircle_finalani.gif"></img>';

//      // searchResults.style.display = 'hidden';
//  }

// }







// var studentIDArray = [];
// var results = document.getElementById("resultsDiv");


// (function() {
//     let baseURL = 'http://148.75.251.185:8888';
//     if (document.readyState != "loading") {
//         app();
//     } else {
//         document.addEventListener('DOMContentLoaded', function() {
//             app();
//         }, false);
//     }

//     function app() {
//         getStudentID();
//         addEventListener();
//         resultsDiv.style.visibility = 'hidden';


//         // let modal = new SimpleModal('mymodal');
//         // setupProfileSubmissionForm();
//     }

//     function getStudentID() {
//         let config = {
//             method: 'GET',
//             headers: new Headers({}),
//         };

//         let request = new Request(`${baseURL}/students`, config);
//         fetch(request)
//             .then(function(res) {
//                 if (res.status == 200)
//                     return res.json();
//                 else
//                     throw new Error('Something went wrong on api server!');
//             })
//             .then(function(res) {
//                 // populatestudentID(res);
//                 searchStudents(res);
//                 // console.log(res);
//             })

//         .catch(function(err) {
//             console.warn(`Couldn't fetch students list`);
//             console.log(err);
//         });
//     }


//     function searchStudents(studentID) {
//         let entryArray = studentID;
//         console.log(entryArray);

//         for (i = 0; i < entryArray.length; i++) {
//             studentIDArray.push({ name: entryArray[i].first_name + " " + entryArray[i].last_name, id: entryArray[i].id });
//         }
//         console.log(studentIDArray);
//     }


//     function getMatches(key) {
//         let results = [];
//         if (!key) {
//             return results;
//         }
//         let expression = new RegExp(key, 'i');
//         for (item of studentIDArray) {
//             if (expression.test(item.name)) {
//                 results.push(item);

//             }

//         }
//         return results;
//     }


//     // //events

//     function addEventListener() {
//         var input = document.querySelector('input');
//         input.addEventListener('input', handleInput, false);
//     }

//     function handleInput(event) {
//         let value = event.target.value;
//         inputVal = value;
//         console.log(inputVal);
//         showResults();
//     }


//     //function to show the input in list
//     function showResults() {
//         let inputArray = inputVal;
//         var searchResults = document.getElementById("searchResults");
//         var searchInput = document.getElementById('searchInput');
//         var selectedDiv = document.getElementById('resultItem');


//         if (inputArray.length > 0) {
//             resultsDiv.style.visibility = 'visible';
//             var showResults = [];
//             searchResults.innerHTML = '';
//             showResults = getMatches(inputVal);
//             // console.log(showResults);
//             for (i = 0; i < showResults.length; i++) {
//                 searchResults.innerHTML += '<div id = "resultItem"' + showResults[i].id  + '>' + '<span id="listSpan">Rank: ' + showResults[i].id + ': </span> ' + showResults[i].name + '</div>';
//                 // var selectedItem = document.getElementById('resultItem');
//                 selectedDiv.addEventListener('click', populateRecord(showResults[i].id), false);

//                 // '<li>' + '<span id="listSpan">Rank: ' + showResults[i].id + ': </span> ' + showResults[i].name + '</li>';
//                 //+ '<img src = "iconPerson.png">' 
//             }
//             searchResults.style.display = 'block';
//         } else {
//             showResults = [];
//             searchResults.innerHTML = '';
//             searchResults.style.display = 'none';
//             resultsDiv.style.visibility = 'hidden';


//             // resultsDiv.innerHTML += '<img src ="http://www.iceflowstudios.com/v3/wp-content/uploads/2013/01/LoadingCircle_finalani.gif"></img>';

//             // searchResults.style.display = 'hidden';

//         }


//     }

//     function populateRecord (selectedID) {
//         let selectedStudent = selectedID;
//         console.log("this is the selected " + selectedStudent);

//          let config = {
//             method: 'GET',
//             headers: new Headers({}),
//         };

//         let request = new Request(`${baseURL}/students/${selectedStudent}`, config);
//         fetch(request)
//             .then(function(res) {
//                 if (res.status == 200)
//                     return res.json();
//                 else
//                     throw new Error('Something went wrong on api server!');
//             })
//             .then(function(res) {
//                 // populatestudentID(res);
//                 showInfo(res)
//                 // console.log(res);
//             })

//         .catch(function(err) {
//             console.warn(`Couldn't fetch students list`);
//             console.log(err);
//         });

//     }

// })();

// function showInfo() {
//     console.log(selectedStudent.email)
// };



//   function getStudents() {
//         let config = {
//             method: 'GET',
//             headers: new Headers({}),
//         };

//         let request = new Request(`${baseURL}/students`, config);
//         fetch(request)
//             .then(function(res) {
//                 if (res.status == 200)
//                     return res.json();
//                 else
//                     throw new Error('Something went wrong on api server!');
//             })
//             .then(function(res) {
//                 for (let student of res) {
//                     let request = new Request(`${baseURL}/students/${student.id}`, config);
//                     fetch(request)
//                         .then(function(res) {
//                             if (res.status == 200)
//                                 return res.json();
//                             else
//                                 throw new Error('Something went wrong on api server!');
//                         })
//                         .then(function(res) {
//                             populateStudent(res);
//                         })
//                         .catch(function(err) {
//                             console.warn(`Couldn't fetch a student!`);
//                             console.log(err);
//                         });
//                 }
//             })
//             .catch(function(err) {
//                 console.warn(`Couldn't fetch students list`);
//                 console.log(err);
//             });f
//     }


// function populateStudentID(studentID) {
//  for (id in studentID) {
//      studentIDArray.push (id);
//  }
//  console.log(studentIDArray;)
// }



//     function populateStudent(student) {
//         let studentArray = [];
//         let bioArray = [];

//         console.log(bioArray);

//         for (id in student.id) {
//             studentArray.push(id);
//             bioArray.push(bio);
//         }

//         console.log("the bio is" + bio);

//         console.log(studentArray);
//         console.log(student.id);

//         let name = document.getElementById("name");
//         let tagline = document.getElementById('tagline');
//         // let bio = document.getElementById('bio');
//         let pic = document.getElementById('pic');
//         let contentSection = document.getElementById('main');

//         main.innerHTML += '<div id ="name">' + student.first_name + " " + student.last_name + '</div>' + 
//         '<div id = "tagline">' + student.excerpt + '</div>' + 
//         '<div id = "pictureDiv">' + '<img id="pic" src="' + baseURL + student.profile_picture + '" />' + '</div>'
//         + '<div id = "bio">' + bio + '</div>' ;
//     }




// //Global Variables
// var names = "Jewell Munter:854370;Alden Ehrhard:852014;Chance Hunnewell:158189;Adriana Geffers:17473;Celia Schnieders:746599;Corliss Denk:791623;Sally Zehnpfennig:185749;Jayme Behrends:462289;Jesica Farmsworth:720507;Laree Chime:822125;Henrietta Chandsawangbh:400455;Regine Criado:593497;Louann Rull:437496;Raylene Bodell:230709;Lenora Heidorn:84678;Terica Bacote:53904;Dena Picket:584555;Laurie Arambuia:912065;Freeda Barbar:725347;Arlena Blenden:512319;Toshia Siaperas:623512;Randell Hassig:117809;Denise Litsey:461117;Ron Blankenbecler:147578;Quincy Wileman:626921;Cherish Patz:744193;Burma Erskin:5184;Arron Bulfer:803810;Tiny Pokorski:482737;Mitzie Hadef:253250;Genie Malys:421633;Robbin Steenburg:356368;Delsie Gallegos:76374;Kaycee Leone:924465;Lorna Komar:474375;Joie Warf:448658;Zana Philpot:710606;Caroline Koles:87033;Joey Heine:740998;Pilar Gividen:714223;Kesha Rushforth:157566;Phebe Yournet:979838;Casimira Wohlenhaus:244810;Glenda Prestridge:466791;Bianca Derienzo:510015;Earnest Lapage:888249;Argentina Arnoux:672254;Elva Wieto:786812;Tomi Kirgan:684709;Jacquelynn Drader:666873;Robert Dasen:449309;";
// var resultsDiv = document.getElementById("resultsDiv");

// var inputVal;
// var nameArray = [];
// var results;
// //Immediately Invoked Function that runs when DOM is ready

// (function() {
//  if (document.readyState != "loading") {
//      addEventListener();
//      var dictionary = new Dictionary(names,",",":");



//  } else {
//      document.addEventListener("DOMContentLoaded", function() {
//      //create instance with seperators I want to parse text by
//      addEventListener();
//      var dictionary = new Dictionary(names,",",":");

//      });

//  }

// })();


// //function to get input

// //function to sort dictionaroy

// function Dictionary (nameString, entryDelimiter, recordDelimiter){
//  let eD = entryDelimiter;
//  let rD = recordDelimiter;
//  let entryArray = nameString.split(eD);
//  // console.log(entryArray);

//  for (i=0;i<entryArray.length;i++) {
//      let tempHolder = entryArray[i].split(rD);
//      // console.log(tempHolder);
//      nameArray.push({name:tempHolder[0], id:tempHolder[1]});
//  }
// }

// function getMatches(key) {
//  let results = [];
//      if(!key) {
//          return results;
//      }

//      let expression = new RegExp(key, 'i');
//      for (item of studentIDList) {
//          if (expression.test(item.name)) {
//              results.push(item);
//          }
//      }

//      return results;
// }


// //events

// function addEventListener(){
//  var input = document.querySelector('input');
//  input.addEventListener('input',handleInput,false);
// }

// function handleInput(event) {
//  let value = event.target.value;
//  inputVal = value;
//  console.log(inputVal);
//  showResults();
// }


// //function to show the input in list
// function showResults() {
//  let inputArray = inputVal;
//  var searchResults = document.getElementById("searchResults");

//  if (inputArray.length > 0) {
//      var showResults = [];

//      searchResults.innerHTML = '';

//      showResults = getMatches(inputVal);
//      // console.log(showResults);
//      for (i=0;i<showResults.length;i++) {
//          searchResults.innerHTML += '<li>' + '<span id="listSpan">Rank: '+ showResults[i].id + ': </span> ' + showResults[i].name +  '</li>';
//          //+ '<img src = "iconPerson.png">' 
//      }
//      searchResults.style.display = 'block';
//  } else {
//      showResults = [];
//      searchResults.innerHTML = '';
//      // resultsDiv.innerHTML += '<img src ="http://www.iceflowstudios.com/v3/wp-content/uploads/2013/01/LoadingCircle_finalani.gif"></img>';

//      // searchResults.style.display = 'hidden';
//  }

// }
