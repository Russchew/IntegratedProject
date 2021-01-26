

$(document).ready (function(){
    let player;
    let rat;
    let map = [["T"," "," "," "," "," "," "],
               [" "," "," "," "," "," ","T"],
               [" "," ","T"," "," "," "," "],
               [" "," "," "," "," "," "," "],
               [" "," "," "," "," "," "," "],
               [" "," "," "," "," "," "," "],
               [" "," "," ","T"," "," ","C"]];
    let spell = ["fireball"]

    //Blueprint for the player and monster
    class Monster {
        constructor(health, attack, defense, mana){
            this.health = health;
            this.attack = attack;
            this.defense = defense;
            this.mana = mana;
        }
    }

    class Player {
        constructor(health, attack, defense, mana, coin, spell){
            this.health = health;
            this.attack = attack;
            this.defense = defense;
            this.mana = mana;
            this.coin = coin;
            this.spell = spell;
        }
    }


    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    playerMage = new Player(50, 5, 3, 50, 10, spell[0]);
    console.log(playerMage);

    rat = new Monster(10, 2, 1, 5);
    console.log(rat);
    
    //console.log(map.length);
    //console.log(map[0]);
    //console.log(map[0][0])

    // var y;
    // var x;

    // for (y = 0; y < map.length; y++){
    //     console.log(map[y]);
    //     for (x = 0; x <map[0].length; x ++){
    //         console.log(map[y][x]);
    //     }
    // }

    // Creating the player when clicking on the class
    $("#class1").click(function(){
        player = new Player(50, 4, 5, 25, 10);
        console.log(player);
        $(".class").css("display", "none");
    });

    
})