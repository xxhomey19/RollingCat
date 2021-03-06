var playState = {
    die: function(cat, obj) {
        music_3.pause();
        die_num = die_num + 1;
        if (taro_num == finalnum && redbean_num == finalnum && greenbean_num == finalnum) {
            game.state.start('loadendstory');
            music_3.destroy();
        } else {
            laugh.play();
            obj.kill();
            game.paused = true;
            b1.alpha = 0.25;
            chairs.alpha = 0.25;
            desks.alpha = 0.25;
            redbeans.alpha = 0.25;
            greenbeans.alpha = 0.25;
            taros.alpha = 0.25;
            chair_2s.alpha = 0.25;
            cat.alpha = 0.25;
            btm = game.add.sprite(innerWidth * 16.5 / 20, innerHeight / 16, 'btm');
            btm.scale.setTo(scaleWidth, scaleHeight);
            con = game.add.sprite(innerWidth * 13.25 / 20, innerHeight / 16, 'continue');
            con.scale.setTo(scaleWidth, scaleHeight);
            restart = game.add.sprite(innerWidth * 10 / 20, innerHeight / 16, 'restart');
            restart.scale.setTo(scaleWidth, scaleHeight);
            $.post('/materia_num', {
                name: username,
                redbean: redbean_num,
                greenbean: greenbean_num,
                taro: taro_num,
                die: die_num
            });
            num_1 = game.add.sprite(innerWidth * 2 / 20, innerHeight / 16, 'result_taro');
            num_1.scale.setTo(scaleWidth, scaleHeight);
            n_taro = game.add.text(innerWidth * 7 / 20, innerHeight * 5 / 32, ' /20', {
                fontSize: 0.0694 * innerWidth + 'px',
                fill: '#ffffff'
            });
            c_taro = game.add.text(innerWidth * 5 / 20, innerHeight * 3 / 32, taro_num, {
                fontSize: 0.105 * innerWidth + 'px',
                fill: '#ffffff'
            });

            num_2 = game.add.sprite(innerWidth * 2 / 20, innerHeight * 6 / 16, 'result_redbean');
            num_2.scale.setTo(scaleWidth, scaleHeight);
            n_redbean = game.add.text(innerWidth * 7 / 20, innerHeight * 15 / 32, ' /20', {
                fontSize: 0.0694 * innerWidth + 'px',
                fill: '#ffffff'
            });
            c_redbean = game.add.text(innerWidth * 5 / 20, innerHeight * 13 / 32, redbean_num, {
                fontSize: 0.105 * innerWidth + 'px',
                fill: '#ffffff'
            });

            num_3 = game.add.sprite(innerWidth * 2 / 20, innerHeight * 11 / 16, 'result_greenbean');
            num_3.scale.setTo(scaleWidth, scaleHeight);
            n_greenbean = game.add.text(innerWidth * 7 / 20, innerHeight * 25 / 32, ' /20', {
                fontSize: 0.0694 * innerWidth + 'px',
                fill: '#ffffff'
            });
            c_greenbean = game.add.text(innerWidth * 5 / 20, innerHeight * 23 / 32, greenbean_num, {
                fontSize: 0.105 * innerWidth + 'px',
                fill: '#ffffff'
            });




            game.input.onDown.add(playState.checkforbt, self);
        }
    },
    checkforbt: function(event) {
        if (game.paused) {
            if (!al) {
                var x1 = innerWidth * 10 / 20;
                var y = innerHeight / 16;
                var x2 = innerWidth * 13.25 / 20;
                var x3 = innerWidth * 16.5 / 20;
                var w = con.width;
                var h = con.height;
                if (event.x > x2 && event.x < x2 + w && event.y > y && event.y < y + h) {
                    playState.backtomenu();
                } else if (event.x > x1 && event.x < x1 + w && event.y > y && event.y < y + h) {
                    playState.backtogame();
                } else if (event.x > x3 && event.x < x3 + w && event.y > y && event.y < y + h) {
                    game.paused = false;
                    music_3.destroy();
                    game.state.start('menu');
                }

            } else {
                playState.killalt();
            }


        }
    },
    killalt: function() {
        btm.alpha = 1;
        con.alpha = 1;
        restart.alpha = 1;
        num_1.alpha = 1;
        num_2.alpha = 1;
        num_3.alpha = 1;
        n_greenbean.alpha = 1;
        c_greenbean.alpha = 1;
        n_redbean.alpha = 1;
        c_redbean.alpha = 1;
        n_taro.alpha = 1;
        c_taro.alpha = 1;
        alter.destroy();
        al = false;
        //obj.x-= innerWidth*2/20;
    },
    backtogame: function() {
        con.destroy();
        restart.destroy();
        num_1.destroy();
        num_2.destroy();
        num_3.destroy();
        n_taro.destroy();
        c_taro.destroy();
        n_redbean.destroy();
        c_redbean.destroy();
        n_greenbean.destroy();
        c_greenbean.destroy();
        btm.destroy();
        b1.alpha = 1;
        chairs.alpha = 1;
        desks.alpha = 1;
        redbeans.alpha = 1;
        greenbeans.alpha = 1;
        taros.alpha = 1;
        chair_2s.alpha = 1;
        cat.alpha = 1;
        music_3.resume();
        game.paused = false;

        //game.state.start('play');
    },
    backtomenu: function() {
        con.alpha = 0.25;
        btm.alpha = 0.25;
        restart.alpha = 0.25;
        num_1.alpha = 0.25;
        num_2.alpha = 0.25;
        num_3.alpha = 0.25;
        n_greenbean.alpha = 0.25;
        c_greenbean.alpha = 0.25;
        n_redbean.alpha = 0.25;
        c_redbean.alpha = 0.25;
        n_taro.alpha = 0.25;
        c_taro.alpha = 0.25;
        var Height = game.cache.getImage("alterbox").height;
        var Width = game.cache.getImage("alterbox").width;
        alter = game.add.sprite(game.world.centerX - Width * scaleWidth / 2, game.world.centerY - Height * scaleHeight / 2, 'alterbox');
        alter.scale.setTo(scaleWidth, scaleHeight);
        al = true;

    },
    hitbound: function(bound, obj) {
        obj.kill();
    },
    collectRedBeans: function(cat, redbean) {
        if (redbean_num < finalnum) {
            redbean.kill();
            redbean_num = redbean_num + 1;
            scoreText_redbean.text = 'Red Bean:' + redbean_num;
        }
        playState.changeSpeed();
        redbean.kill();
    },
    collectGreenBeans: function(cat, greenbean) {
        if (greenbean_num < finalnum) {
            greenbean.kill();
            greenbean_num = greenbean_num + 1;
            scoreText_greenbean.text = 'Green Bean:' + greenbean_num;
        }
        playState.changeSpeed();
        greenbean.kill();
    },
    collectTaros: function(cat, taro) {
        if (taro_num < finalnum) {
            taro.kill();
            taro_num = taro_num + 1;
            scoreText_taro.text = 'Taro:' + taro_num;
        }
        playState.changeSpeed();
        taro.kill();
    },
    createElement: function(num) {
        var max_x = innerWidth;
        var half_innerWidth = innerWidth / 2;
        for (var i = 0; i < num; i++) {
            var x = game.rnd.integerInRange(1, 6);

            if (x == 1 && redbean_num < finalnum) {
                max_x += half_innerWidth + game.rnd.integerInRange(redbean.width, half_innerWidth);
                redbean = redbeans.create(max_x, game.rnd.integerInRange(0, innerHeight - redbean.height), 'redbean');
                redbean.scale.setTo(scaleWidth, scaleHeight);
                redbean.body.velocity.x = redbean_v * levelSpeed;
                redbean.body.allowGravity = false;
            } else if (x == 2) {
                max_x += half_innerWidth + game.rnd.integerInRange(desk.width, half_innerWidth)
                desk = desks.create(max_x, innerHeight - desk.height, 'desk');
                desk.scale.setTo(scaleWidth, scaleHeight);
                desk.body.velocity.x = desk_v * levelSpeed;
                desk.body.allowGravity = false;
            } else if (x == 3) {
                max_x += half_innerWidth + game.rnd.integerInRange(chair.width, half_innerWidth)
                chair = chairs.create(max_x, innerHeight - chair.height, 'chair');
                chair.scale.setTo(scaleWidth, scaleHeight);
                chair.body.velocity.x = chair_v * levelSpeed;
                chair.body.allowGravity = false;
            } else if (x == 4 && greenbean_num < finalnum) {
                max_x += half_innerWidth + game.rnd.integerInRange(greenbean.width, half_innerWidth)
                greenbean = greenbeans.create(max_x, game.rnd.integerInRange(0, innerHeight - greenbean.height), 'greenbean');
                greenbean.scale.setTo(scaleWidth, scaleHeight);
                greenbean.body.velocity.x = greenbean_v * levelSpeed;
                greenbean.body.allowGravity = false;
            } else if (x == 5 && taro_num < finalnum) {
                max_x += half_innerWidth + game.rnd.integerInRange(taro.width, half_innerWidth)
                taro = taros.create(max_x, game.rnd.integerInRange(0, innerHeight - taro.height), 'taro');
                taro.scale.setTo(scaleWidth, scaleHeight);
                taro.body.velocity.x = taro_v * levelSpeed;
                taro.body.allowGravity = false;
            } else {
                max_x += half_innerWidth + game.rnd.integerInRange(chair_2.width, half_innerWidth)
                chair_2 = chair_2s.create(max_x, innerHeight - chair_2.height, 'chair_2');
                chair_2.scale.setTo(scaleWidth, scaleHeight);
                chair_2.body.velocity.x = chair_v * levelSpeed;
                chair_2.body.allowGravity = false;
            }
            //console.log(max_x);
        }
    },

    create: function() {
        // background
        game.physics.arcade.gravity.y = 1500; //地圖重力

        //background = game.add.tileSprite(0, 0, 1960 * 3, 1080, 'background');
        //background.scale.setTo(scaleWidth, scaleHeight);
        b1 = game.add.tileSprite(0, 0, 1920, 1080, 'back_contract');
        b1.tileScale.y = 2.4 * scaleHeight;
        b1.tileScale.x = 2.4 * scaleWidth;
        bound = game.add.sprite(-innerWidth - 300, 0, 'login_back');
        bound.scale.setTo(scaleWidth, scaleHeight);
        game.physics.arcade.enable(bound);
        bound.body.allowGravity = false;

        music_3 = game.add.audio('m_bgm');
        music_3.play();
        music_3.loop = true;
        
        laugh = document.createElement("AUDIO");
        laugh.src = './assets/dead.mp3'
        game.input.mouse.capture = true;
        // obstacle groups
        desks = game.add.group();
        //game.physics.arcade.enable(desks);
        desks.enableBody = true;
        chairs = game.add.group();
        //game.physics.arcade.enable(chairs);

        chairs.enableBody = true;

        chair_2s = game.add.group();
        chair_2s.enableBody = true;
        var deskHeight = game.cache.getImage("desk").height;
        var deskWidth = game.cache.getImage("desk").width;
        var chairHeight = game.cache.getImage("chair").height;
        var chairWidth = game.cache.getImage("chair").width;
        var chair_2Height = game.cache.getImage("chair_2").height;
        var chair_2Width = game.cache.getImage("chair_2").width;

        //desk
        desk = desks.create(randomXPosition + 1000, game.world.height - deskHeight * scaleHeight, 'desk');
        desk.scale.setTo(scaleWidth, scaleHeight); //重設大小
        desk.body.velocity.x = desk_v;
        desk.body.allowGravity = false;
        //stone_1.body.immovable = true;

        //chair
        chair = chairs.create(randomXPosition + chairWidth + 2500, game.world.height - chairHeight * scaleHeight, 'chair');
        chair.scale.setTo(scaleWidth, scaleHeight);
        chair.body.velocity.x = chair_v;
        chair.body.allowGravity = false;
        //stone_2.body.immovable = true;
        chair_2 = chair_2s.create(randomXPosition + chair_2Width + 3500, game.world.height - chair_2Height * scaleHeight, 'chair_2');
        chair_2.scale.setTo(scaleWidth, scaleHeight);
        chair_2.body.velocity.x = chair_v;
        chair_2.body.allowGravity = false;
        // cat
        cat = game.add.sprite(game.world.width * 0.2, game.world.height - 500, 'cat');
        cat.scale.setTo(scaleWidth * 0.9, scaleHeight);
        cat.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(cat);
        cat.body.gravity.y = innerHeight;
        cat.body.collideWorldBounds = true;

        /*cat.animations.add('left',[0,1,2,3],10,true);
		cat.animations.add('right',[5,6,7,8],10,true);
	    */

        //scoreText
        scoreText_redbean = game.add.text(16, 16, 'Red Bean: ' + redbean_num, {
            fontSize: '32px',
            fill: '#000'
        });
        scoreText_greenbean = game.add.text(226, 16, 'Green Bean: ' + greenbean_num, {
            fontSize: '32px',
            fill: '#000'
        });
        scoreText_taro = game.add.text(486, 16, 'Taro: ' + taro_num, {
            fontSize: '32px',
            fill: '#000'
        });

        redbeans = game.add.group();
        redbeans.enableBody = true;
        //game.physics.arcade.enable(redbeans);
        greenbeans = game.add.group();
        greenbeans.enableBody = true;
        //game.physics.arcade.enable(greenbeans);
        taros = game.add.group();
        taros.enableBody = true;
        //game.physics.arcade.enable(taros);
        redbean = redbeans.create(2800, 0, 'redbean');
        redbean.scale.setTo(scaleWidth, scaleHeight);
        redbean.body.velocity.x = redbean_v;
        redbean.body.allowGravity = false;

        greenbean = greenbeans.create(2800 * 2, 0, 'greenbean');
        greenbean.scale.setTo(scaleWidth, scaleHeight);
        greenbean.body.velocity.x = greenbean_v;
        greenbean.body.allowGravity = false;
        taro = taros.create(2800 * 3, 0, 'taro');
        taro.scale.setTo(scaleWidth, scaleHeight);
        taro.body.velocity.x = taro_v;
        taro.body.allowGravity = false;
        game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.UP
        ]);
        playState.changeSpeed();
        //b1.tilePosition.x += -innerWidth/3 * scaleWidth * levelSpeed;
        //b2.tilePosition.x += -innerWidth/3 * scaleWidth * levelSpeed;
        if (innerHeight <= 414)
            jumpHeight = 7;
        playState.changeSpeed();
    },
    update: function() {
        //game.physics.arcade.collide(cat, stones);
        game.physics.arcade.overlap(cat, redbeans, playState.collectRedBeans, null, this);
        game.physics.arcade.overlap(cat, greenbeans, playState.collectGreenBeans, null, this);
        game.physics.arcade.overlap(cat, taros, playState.collectTaros, null, this);

        game.physics.arcade.overlap(cat, desks, playState.die, null, this);
        game.physics.arcade.overlap(cat, chair_2s, playState.die, null, this);
        game.physics.arcade.overlap(cat, chairs, playState.die, null, this);
        game.physics.arcade.overlap(bound, [redbeans, greenbeans, taros, desks, chairs, chair_2s], playState.hitbound, null, this);

        b1.tilePosition.x += -20 * scaleWidth * levelSpeed;
        //b2.tilePosition.x += -20 * scaleWidth * levelSpeed;
        cat.body.velocity.x = 0;
        cat.angle += 10; //旋轉

        if (redbeans.total == 0 && greenbeans.total == 0 && taros.total == 0 && desks.total == 0 && chairs.total == 0 && chair_2s.total == 0) {
            playState.createElement(5);
        }

        //偵測有沒有碰到地板
        onTheGround = cat.body.blocked.down;
        if (onTheGround) {
            //限定只能跳兩次
            jumps = 2;
        }

        game.input.onDown.add(this.jump_down, this, 0);
        game.input.onDown.add(this.jump_up, this, 0);
    },
    jump_down: function() {
        if (jumps > 0) {
            cat.body.velocity.y = -innerHeight * jumpHeight * scaleHeight;
            jumping = true;
        }
    },
    jump_up: function() {
        if (jumping) {
            jumps--;
            jumping = false;
        }
    },
    changeSpeed: function() {
        var sum = taro_num + redbean_num + greenbean_num;
        if (sum > 5 && sum <= 10)
            levelSpeed = 1.1;
        else if (sum > 10 && sum <= 15)
            levelSpeed = 1.15;
        else if (sum > 15 && sum <= 25)
            levelSpeed = 1.2;
        else if (sum > 25 && sum <= 35)
            levelSpeed = 1.3;
        else if (sum > 35 && sum <= 50)
            levelSpeed = 1.4;
        else if (sum > 50 && sum <= 75)
            levelSpeed = 1.6;
        else if (sum > 75 && sum <= 100)
            levelSpeed = 1.7;
        else if (sum > 100)
            levelSpeed = 1.9;

        redbean.body.velocity.x = redbean_v * levelSpeed;
        greenbean.body.velocity.x = redbean_v * levelSpeed;
        taro.body.velocity.x = redbean_v * levelSpeed;
        desk.body.velocity.x = desk_v * levelSpeed;
        chair.body.velocity.x = chair_v * levelSpeed;
        chair_2.body.velocity.x = chair_v * levelSpeed;
    }
};
