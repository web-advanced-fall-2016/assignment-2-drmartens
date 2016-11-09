var studentIDArray = [];
var currentResult;

(function() {
    let baseURL = 'http://148.75.251.185:8888';
    var searchResults = document.getElementById("searchResults");

    //accordion stuff
    let selectors = {
        itemSelector: '.accordion-item',
        rootSelector: '.accordion',
        contentSelector: '.item-content',
        titleSelector: '.item-title'
    };
    let selectors2 = {
        itemSelector: '.accordion-2-item',
        rootSelector: '.accordion-2',
        contentSelector: '.item-content',
        titleSelector: '.item-title'
    };


    if (document.readyState != 'loading') {
        let accordions = new SimpleAccordion(selectors, { enabled: true, openingDuration: 200, closingDuration: 200, resolution: 5, mutualExclusive: false });
        let accordions2 = new SimpleAccordion(selectors2, { enabled: true, openingDuration: 200, closingDuration: 200, resolution: 5 });
        app();    
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            let accordions = new SimpleAccordion(selectors, { enabled: true, openingDuration: 200, closingDuration: 200, resolution: 5 });
            let accordions2 = new SimpleAccordion(selectors2, { enabled: true, openingDuration: 200, closingDuration: 200, resolution: 5 });
            app();
        });
    }

    function app() {
        getStudentID();
        addEventListener();
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
        searchResults.addEventListener('click',function(evnt){
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
                
            searchResults.innerHTML += //`<div class="resultItem" data-id=${showResults[i].id}><span class="listSpan">Rank:${showResults[i].id}:</span>${showResults[i].name}</div>`;
            '<div class = "accordion-item" id="item" data-id=' + showResults[i].id + '>' + '<div class = "item-title" id="studentResults" >'  + 'ID: ' + showResults[i].id + ' Name: ' +  showResults[i].name + '</div>' + 
            '<div class = "item-content" id="resultsDiv">""</div>'
            }
            if(showResults.length)
                searchResults.style.display = 'flex';
        } else {
            searchResults.style.display = 'none';
        }


    }

    function populateRecord (selectedID) {
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

    function showInfo(student) {
        var selected = document.getElementById('item');
        var dataID = selected.getAttribute('data-id'); // fruitCount = '12'
        console.log(dataID);

        var results = document.getElementById("resultsDiv");

// var targetDiv = document.getElementById("foo").getElementsByClassName("bar")[0];

    


        results.innerHTML = '<p> Name: ' + student.first_name + ' ' + student.last_name + '</p>'
        + '<p> Email: ' + student.email + '</p>' 
        + '<p> About: ' + student.excerpt + '</p>'
       

    console.log(student.first_name);
    console.log(student.full_bio);


};

})();

