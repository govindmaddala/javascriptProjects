$(document).ready(() => {

    $('#pwd').tooltip({
        track: true,
        show: { effect: "pulsate" },
        hide: { effect: "explode" }
    })

    $('.show').click(() => {
        $('#image1').show(2000);
    });

    $('.hide').click(() => {
        $('#image1').hide(2000);
    });

    $('.toggle').click(() => {
        $('#image1').toggle(2000);
    });

    $('.animation').click(() => {
        $('#image1').animate({ borderRadius: "50%", height: "50%", width: "100%" }, 3000, () => {
            $('#image1').animate({ borderRadius: "0%", height: "40%", width: "40%" }, 2000)
        })
    })

    $('.button').click(() => {
        $('.but').append('<p>append</p>');
        $('.but').prepend('<p>prepend</p>');
        $('.but').before('<p>before</p>');
        $('.but').after('<p>after</p>');
    })

    $('.btn1').click(() => {
        $('div.content p').remove();

    })

    $('.btn2').click(() => {
        $('.btn2').empty();
    })

    $('#datefrom').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 2
    });

    $('#accordionID').accordion({
        collapsible: true,
        animate: 2000,
        event: "mouseover"
    });

    $('#dialog').dialog({
        title: "message",
        draggable: false,
        resizable: false,
        closeOnEscape: false,
        modal: true
    });

    $('.box').draggable({
        opacity: "0.6"
    });


    $('.sortingDemo').sortable();

    $('.img').resizable({
        animate: true,
        ghost: true,
        // aspectRatio:true
        aspectRatio: 20 / 10
    });

    $('#colorChange').draggable({
        draggable: true
    });



    // $('#colorChange').click(() => {
    //     if (document.getElementById('colorChange').innerText === "Change Color") {
    //         $('h1').css('color', 'red')
    //         $('#colorChange').text("color is changed")
    //     }
    //     else {
    //         $('h1').css('color', 'black')
    //         $('#colorChange').text("Change Color")
    //     }
    // })

    // document.addEventListener('keypress', (event) => {
    //     setTimeout(() => {
    //         alert(event.key + " is pressed")
    //     }, 1000);
    // })

    // $(document).on('keypress',(event) => {
    //     setTimeout(() => {
    //         alert(event.key + " is pressed")
    //     }, 1000);
    // })

    // $("h1").mouseenter(()=>{
    //     $("h1").css('backgroundColor','yellow')
    // })

    // $("h1").mouseleave(()=>{
    //     $("h1").css('backgroundColor','white')
    // })

    $("h1").hide();

    $('#colorChange').click(() => {
        $("h1").show();
        $("h1").fadeOut();
        $("h1").fadeIn();
        $("h1").animate({ fontSize: "200px", color: "red", backgroundColor: "yellow" },100)
    })

    var languages = ['c', 'c++', 'c#', 'java', 'javascript', 'python']

    $('#lang').autocomplete({ source: languages }, { autofocus: true })

    $('#marq').resizable();

    const places = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
        ];

    $('#mycity').autocomplete({source:places})


})