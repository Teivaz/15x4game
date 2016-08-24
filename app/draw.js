function draw_all() {
    function w(element_id, text) {
        document.getElementById(element_id).innerHTML = text;
    }


    //w("time_container", Time.getHTML());

    w("goals_container", Goal.getHTML());

    w("enthusiasm_indicator", Player.enthusiasm.toFixed(2));

    w("volunteers_indicator", Player.volunteers.toFixed(2));
    w("volunteers_memory_indicator", Player.volunteers_memory.toFixed(2));

    w("departments_container", Department.getHTML());
    w("resources_container", Storages.getR1HTML());
    w("С2_resources_container", Storages.getC2HTML());
    w("events_container", Event.getHTML());
    w("offered_lecture_container", Lecture.getHTML());

    w("hype", Lecture.hype);   
    w("knowledge_indicator", Player.knowledge.toFixed(2));


    /*var skill_html = "";
    skills.forEach(function(skill) {
        skill_html += '<div class="flex-element flex-container-column" id="' + skill + '">';
        skill_html += '<span id="' + skill + '_indicator">' + skill.capitalizeFirstLetter() + ': ' + Player[skill].toFixed(2) + '/60</span>';
        if (Player.found_secrets.indexOf('self_study') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.selfStudy(\'' + skill + '\')">Self-study</button>';
        if (Player.found_secrets.indexOf('books') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.books(\'' + skill + '\')">Books</button>';
        if (Player.found_secrets.indexOf('work') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.work(\'' + skill + '\')">Work</button>';
        if (Player.found_secrets.indexOf('pet_project') !== -1) skill_html += '<button data-tooltip=\'' + skill + '\' onclick="Player.petProject(\'' + skill + '\')">Pet-project</button>';
        skill_html += '</div>';
    });*/

    w("skills_container", skills.getHTML());
    w("badges_container", badges.getHTML());
    w("objectives_container", objectives.getHTML());
    w("actions_container", actions.getHTML());
    w("startups_container", Startup.getHTML());



    var reputations_html = "";
    ["kindness", "generosity", "thoughtfulness", "innovativeness"].forEach(function(reputation_name) {
        reputations_html += '<div class="flex-element reputation_element">' + reputation_name.capitalizeFirstLetter() + ': ' +
            Player[reputation_name].toFixed(2) + '<span class="flex-element" id="' + reputation_name + '_indicator"></span></div>';
    });
    w("reputations", reputations_html);





    w("space_container", Space.getHTML());
    w("rally_container", Rally.getHTML());
    w("castle_container", Castle.getHTML());

    w("dungeon_battlefield_container", Dungeon.getBattlefieldString());

}
