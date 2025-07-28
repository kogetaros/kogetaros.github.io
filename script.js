//グローバル変数
let player = ['name', 'level', 'hp', 'attack', 'maxHP', 'defending', 'hpPotion', 'pwPotion', 'hpupPotion', 'end', 'bonus', 'ultimate', 'coin', 'stage', 'points'];
let enemy = ['name', 'hp', 'attack', 'maxHP', 'coin', 'points'];
let items = ['potion'];
let flg = ['stage2', 'stage3', 'stage4', 'stage8', 'stageLast', 'castle', 'extra1', 'extra1Win', 'stageLastWin'];

let battleLogLive = [];
let sessionLogs = [];

//プレイヤーの初期設定
player.level = 1;
player.maxHP = 50;
player.hp = 50;
player.attack = 10;
player.bonus = true;
player.coin = 10;
player.stage = 1;
player.hpPotion = 3;
player.pwPotion = 0;
player.hpupPotion = 0;
player.points = 0;

//flgの初期設定
flg.stage2 = false;
flg.stage3 = false;
flg.stage4 = false;
flg.stage8 = false;
flg.stageLast = false;
flg.castle = false;
flg.extra1 = false;
flg.extra1Win = false;
flg.stageLastWin = false;

// 指定したパネルID(sectionIds)だけを表示し、それ以外を非表示にする
function showSection(sectionIds) {
    //確認ログ（sectionIdsの値）
    console.log(sectionIds);
    const allSections = ['startMenu', 'castle', 'menu', 'map', 'gameUI', 'logPanel', 'sessionLogPanel', 'restartMenu', 'instructionsPanel', 'enemyListPanel', 'itemshop', 'weaponshop'];

    allSections.forEach(id => {
        const element = document.getElementById(id);
        if (sectionIds.includes(id)) {
            console.log("block:" + id);
            element.style.display = "block";
        } else {
            console.log("none:" + id);
            element.style.display = "none";
        }
    });
}

//ゲームスタートでMAPに遷移
function playGames() {
    console.log("MAXHP" + player.maxHP);
    console.log("HP" + player.hp);
    console.log("POINTS" + player.points);
    console.log("ATTACK" + player.attack);
    let gameClearPanel = document.getElementById('gameClearPanel');
    gameClearPanel.style.display = "none";
    let extra1 = document.getElementById("extra1");
    extra1.style.display = "none";
    let stageLast = document.getElementById("stageLast");
    stageLast.style.display = "none";
    let playerInput = document.getElementById("playerInput");
    player.name = playerInput.value.trim();
    let effect = document.getElementById("effect");
    effect.innerHTML = "";
    let sectionIds = [];

    if (!player.name) {
        alert("名前を入力してください！");
    } else {
        if (player.name === "最強") {
            player.maxHP = 10000;
            player.hp = 10000;
            player.attack = 200;
            player.coin = 10000;
            player.defending = false;
            player.hpPotion = 100;
            player.points = 0;
            flg.stage2 = true;
            flg.stage3 = true;
            flg.stage4 = true;
            flg.stage8 = true;
            flg.stageLast = true;
            flg.castle = true;
            flg.extra1 = true;
        }
        if (player.name === "こが") {
            player.maxHP = 10000;
            player.hp = 10000;
            player.attack = 200;
            player.coin = 10000;
            player.defending = false;
            player.hpPotion = 100;
            player.points = 0;
        }
        //画面表示
        let map = document.getElementById("map");
        sectionIds.push(map.id);
        showSection(sectionIds);
    }
}

//メニューを開く
function menuOpen() {
    player.hp = player.maxHP;
    let sectionIds = [];
    let menu = document.getElementById("menu");
    sectionIds.push(menu.id);
    //ステータス画面で表示
    let Level = document.getElementById("Level");
    Level.innerHTML = player.level;
    let Name = document.getElementById("Name");
    Name.innerHTML = player.name;
    let HP = document.getElementById("HP");
    HP.innerHTML = player.hp;
    let Attack = document.getElementById("Attack");
    Attack.innerHTML = player.attack;
    let Coin = document.getElementById("Coin");
    Coin.innerHTML = player.coin;
    haveItems();
    showSection(sectionIds);
}

//メニュー画面で持ち物を表示する
function haveItems() {
    let hpPotion = document.getElementById("hpPotion");
    let pwPotion = document.getElementById("pwPotion");
    let hpupPotion = document.getElementById("hpupPotion");
    let have1 = document.getElementById("have1");
    let have2 = document.getElementById("have2");
    let have3 = document.getElementById("have3");
    let no = document.getElementById("no");
    if (player.hpPotion > 0) {
        no.style.display = "none";
        hpPotion.style.display = "block";
        have1.innerHTML = player.hpPotion;
    }
    if (player.pwPotion > 0) {
        no.style.display = "none";
        pwPotion.style.display = "block";
        have2.innerHTML = player.pwPotion;
    }
    if (player.hpupPotion > 0) {
        no.style.display = "none";
        hpupPotion.style.display = "block";
        have3.innerHTML = player.hpupPotion;
    }
    if (player.hpPotion === 0 && player.pwPotion === 0 && player.hpupPotion === 0) {
        no.style.display = "block";
        hpPotion.style.display = "none";
        pwPotion.style.display = "none";
        hpupPotion.style.display = "none";
    }
}

//メニューを閉じる
function menuClose() {
    let sectionIds = [];
    let map = document.getElementById("map");
    sectionIds.push(map.id);
    showSection(sectionIds);
}

//お城のメニューを閉じる
function castleShow() {
    let sectionIds = [];
    if (flg.castle) {
        //画面表示
        let castle = document.getElementById("castle");
        sectionIds.push(castle.id);
        showSection(sectionIds);
    } else {
        alert("進めないようだ…");
    }
}

//治癒のポーションを購入する
function buyHpPotion() {
    if (player.coin < 1000) {
        alert("コインが足りません");
    } else {
        player.coin -= 1000;
        player.hpPotion += 1;
        alert("治癒のポーションを購入しました！");
    }
}

//力のポーションを購入する
function buyPwPotion() {
    if (player.coin < 5000) {
        alert("コインが足りません");
    } else {
        player.coin -= 5000;
        player.pwPotion += 1;
        alert("力のポーションを購入しました！");
    }
}

//体力のポーションを購入する
function buyHpUpPotion() {
    if (player.coin < 3000) {
        alert("コインが足りません");
    } else {
        player.coin -= 3000;
        player.hpupPotion += 1;
        alert("体力のポーションを購入しました！");
    }
}

//ゲーム開始/stage1
function startGames1() {
    let playerInput = document.getElementById("playerInput");
    player.name = playerInput.value.trim();
    let effect = document.getElementById("effect");
    effect.innerHTML = "";
    player.stage = 1;
    let sectionIds = [];

    if (!player.name) {
        alert("名前を入力してください！");
    } else {
        //画面表示
        gameUI = document.getElementById("gameUI");
        logPanel = document.getElementById("logPanel");
        sectionIds.push(gameUI.id, logPanel.id);
        showSection(sectionIds);

        //初期化:HP/ポーション/防御
        player.hp = player.maxHP;
        player.defending = false;
        player.end = false;

        let playerLevel = document.getElementById("playerLevel");
        playerLevel.innerHTML = player.level;

        let playerName = document.getElementById("playerName");
        playerName.innerHTML = player.name;

        let playerAttack = document.getElementById("playerAttack");
        playerAttack.innerHTML = player.attack;

        //敵キャラクターを生成
        generateEnemy1();

        //戦闘ログ初期化（配置と表示）
        let battleLog = document.getElementById("battleLog");
        battleLog.innerHTML = "";
        console.log("battleLogLive初期化:" + battleLogLive);

        //ステータス表示更新処理
        updateDisplay();
    }
}

//ゲーム開始/stage2
function startGames2() {
    if (flg.stage2) {
        let playerInput = document.getElementById("playerInput");
        player.name = playerInput.value.trim();
        let effect = document.getElementById("effect");
        effect.innerHTML = "";
        player.stage = 2;
        let sectionIds = [];

        if (!player.name) {
            alert("名前を入力してください！");
        } else {
            //画面表示
            gameUI = document.getElementById("gameUI");
            logPanel = document.getElementById("logPanel");
            sectionIds.push(gameUI.id, logPanel.id);
            showSection(sectionIds);

            //初期化:HP/ポーション/防御
            player.hp = player.maxHP;
            player.defending = false;
            player.end = false;

            let playerLevel = document.getElementById("playerLevel");
            playerLevel.innerHTML = player.level;

            let playerName = document.getElementById("playerName");
            playerName.innerHTML = player.name;

            let playerAttack = document.getElementById("playerAttack");
            playerAttack.innerHTML = player.attack;

            //敵キャラクターを生成
            generateEnemy2();

            //戦闘ログ初期化（配置と表示）
            let battleLog = document.getElementById("battleLog");
            battleLog.innerHTML = "";
            console.log("battleLogLive初期化:" + battleLogLive);

            //ステータス表示更新処理
            updateDisplay();
        }
    } else {
        alert("進めないようだ…");
    }
}

//ゲーム開始/stage3
function startGames3() {
    if (flg.stage3) {
        let playerInput = document.getElementById("playerInput");
        player.name = playerInput.value.trim();
        let effect = document.getElementById("effect");
        effect.innerHTML = "";
        player.stage = 3;
        let sectionIds = [];

        if (!player.name) {
            alert("名前を入力してください！");
        } else {
            //画面表示
            gameUI = document.getElementById("gameUI");
            logPanel = document.getElementById("logPanel");
            sectionIds.push(gameUI.id, logPanel.id);
            showSection(sectionIds);

            //初期化:HP/ポーション/防御
            player.hp = player.maxHP;
            player.defending = false;
            player.end = false;

            let playerLevel = document.getElementById("playerLevel");
            playerLevel.innerHTML = player.level;

            let playerName = document.getElementById("playerName");
            playerName.innerHTML = player.name;

            let playerAttack = document.getElementById("playerAttack");
            playerAttack.innerHTML = player.attack;

            //敵キャラクターを生成
            generateEnemy3();

            //戦闘ログ初期化（配置と表示）
            let battleLog = document.getElementById("battleLog");
            battleLog.innerHTML = "";
            console.log("battleLogLive初期化:" + battleLogLive);

            //ステータス表示更新処理
            updateDisplay();
        }
    } else {
        alert("進めないようだ…");
    }
}

//ゲーム開始/stage4
function startGames4() {
    if (flg.stage4) {
        let playerInput = document.getElementById("playerInput");
        player.name = playerInput.value.trim();
        let effect = document.getElementById("effect");
        effect.innerHTML = "";
        player.stage = 4;
        let sectionIds = [];

        if (!player.name) {
            alert("名前を入力してください！");
        } else {
            //画面表示
            gameUI = document.getElementById("gameUI");
            logPanel = document.getElementById("logPanel");
            sectionIds.push(gameUI.id, logPanel.id);
            showSection(sectionIds);

            //初期化:HP/ポーション/防御
            player.hp = player.maxHP;
            player.defending = false;
            player.end = false;

            let playerLevel = document.getElementById("playerLevel");
            playerLevel.innerHTML = player.level;

            let playerName = document.getElementById("playerName");
            playerName.innerHTML = player.name;

            let playerAttack = document.getElementById("playerAttack");
            playerAttack.innerHTML = player.attack;

            //敵キャラクターを生成
            generateEnemy4();

            //戦闘ログ初期化（配置と表示）
            let battleLog = document.getElementById("battleLog");
            battleLog.innerHTML = "";
            console.log("battleLogLive初期化:" + battleLogLive);

            //ステータス表示更新処理
            updateDisplay();
        }
    } else {
        alert("進めないようだ…");
    }
}

//ゲーム開始/stage8
function startGames8() {
    if (flg.stage8) {
        let playerInput = document.getElementById("playerInput");
        player.name = playerInput.value.trim();
        let effect = document.getElementById("effect");
        effect.innerHTML = "";
        player.stage = 8;
        let sectionIds = [];

        if (!player.name) {
            alert("名前を入力してください！");
        } else {
            //画面表示
            gameUI = document.getElementById("gameUI");
            logPanel = document.getElementById("logPanel");
            sectionIds.push(gameUI.id, logPanel.id);
            showSection(sectionIds);

            //初期化:HP/ポーション/防御
            player.hp = player.maxHP;
            player.defending = false;
            player.end = false;

            let playerLevel = document.getElementById("playerLevel");
            playerLevel.innerHTML = player.level;

            let playerName = document.getElementById("playerName");
            playerName.innerHTML = player.name;

            let playerAttack = document.getElementById("playerAttack");
            playerAttack.innerHTML = player.attack;

            //敵キャラクターを生成
            generateEnemy8();

            //戦闘ログ初期化（配置と表示）
            let battleLog = document.getElementById("battleLog");
            battleLog.innerHTML = "";
            console.log("battleLogLive初期化:" + battleLogLive);

            //ステータス表示更新処理
            updateDisplay();
        }
    } else {
        alert("進めないようだ…");
    }
}

//ゲーム開始/stageLast
function startGamesLast() {
    if (flg.stageLast) {
        let playerInput = document.getElementById("playerInput");
        player.name = playerInput.value.trim();
        let effect = document.getElementById("effect");
        effect.innerHTML = "";
        player.stage = 'last';
        let sectionIds = [];

        if (!player.name) {
            alert("名前を入力してください！");
        } else {
            //画面表示
            gameUI = document.getElementById("gameUI");
            logPanel = document.getElementById("logPanel");
            sectionIds.push(gameUI.id, logPanel.id);
            showSection(sectionIds);

            //初期化:HP/ポーション/防御
            player.hp = player.maxHP;
            player.defending = false;
            player.end = false;

            let playerLevel = document.getElementById("playerLevel");
            playerLevel.innerHTML = player.level;

            let playerName = document.getElementById("playerName");
            playerName.innerHTML = player.name;

            let playerAttack = document.getElementById("playerAttack");
            playerAttack.innerHTML = player.attack;

            //敵キャラクターを生成
            generateEnemyLast();

            //戦闘ログ初期化（配置と表示）
            let battleLog = document.getElementById("battleLog");
            battleLog.innerHTML = "";
            console.log("battleLogLive初期化:" + battleLogLive);

            //ステータス表示更新処理
            updateDisplay();
        }
    } else {
        alert("進めないようだ…");
    }
}

function extra1() {
    if (flg.extra1) {
        let playerInput = document.getElementById("playerInput");
        player.name = playerInput.value.trim();
        let effect = document.getElementById("effect");
        effect.innerHTML = "";
        player.stage = 'ex1';
        let sectionIds = [];

        if (!player.name) {
            alert("名前を入力してください！");
        } else {
            //画面表示
            gameUI = document.getElementById("gameUI");
            logPanel = document.getElementById("logPanel");
            sectionIds.push(gameUI.id, logPanel.id);
            showSection(sectionIds);

            //初期化:HP/ポーション/防御
            player.hp = player.maxHP;
            player.defending = false;
            player.end = false;

            let playerLevel = document.getElementById("playerLevel");
            playerLevel.innerHTML = player.level;

            let playerName = document.getElementById("playerName");
            playerName.innerHTML = player.name;

            let playerAttack = document.getElementById("playerAttack");
            playerAttack.innerHTML = player.attack;

            //敵キャラクターを生成
            generateEnemyExtra1();

            //戦闘ログ初期化（配置と表示）
            let battleLog = document.getElementById("battleLog");
            battleLog.innerHTML = "";
            console.log("battleLogLive初期化:" + battleLogLive);

            //ステータス表示更新処理
            updateDisplay();
        }
    } else {
        alert("進めないようだ…");
    }
}

//敵キャラクターの生成/stage1
function generateEnemy1() {
    //敵のHPと攻撃力を定義
    if (player.level > 1) {
        let types = ['スライム', 'ゴブリン', 'ゲベロペ'];

        //敵キャラクターのランダム取得
        let selected = Math.floor(Math.random() * types.length);
        enemy.name = types[selected];

        let monster = document.getElementById("monster");
        let area = document.getElementById("area");
        switch (enemy.name) {
            case 'スライム':
                enemy.name = 'スライム';
                enemy.hp = 50;
                enemy.attack = 5;
                enemy.maxHP = 50;
                enemy.coin = 10;
                enemy.level = 1;
                enemy.points = 60;
                area.innerHTML = "<img src='area1.png' alt='背景' width='100%' height='740px'>";
                monster.innerHTML = "<img class='move-left-right' src='スライム.png' alt='背景' width='100%' height='60px'>";
                slime()
                break;
            case 'ゴブリン':
                enemy.name = 'ゴブリン';
                enemy.hp = 67;
                enemy.attack = 9;
                enemy.maxHP = 67;
                enemy.coin = 20;
                enemy.level = 3;
                enemy.points = 80;
                area.innerHTML = "<img src='area1.png' alt='背景' width='100%' height='740px'>";
                monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ゴブリン.png' alt='背景' width='100%' height='200px'>";
                break;
            case 'ゲベロペ':
                enemy.name = 'ゲベロペ';
                enemy.hp = 120;
                enemy.attack = 20;
                enemy.maxHP = 120;
                enemy.coin = 500;
                enemy.level = 10;
                enemy.points = 200;
                area.innerHTML = "<img src='area1.png' alt='背景' width='100%' height='740px'>";
                monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ゲベロペ.png' alt='背景' width='100%' height='250px'>";
                break;
            default:
                break;
        }
    } else if (player.level === 1) {
        let types = ['スライム'];

        //敵キャラクターのランダム取得
        let selected = Math.floor(Math.random() * types.length);
        enemy.name = types[selected];

        let monster = document.getElementById("monster");
        let area = document.getElementById("area");
        switch (enemy.name) {
            case 'スライム':
                enemy.name = 'スライム';
                enemy.hp = 50;
                enemy.attack = 1;
                enemy.maxHP = 50;
                enemy.coin = 10;
                enemy.level = 1;
                enemy.points = 100;
                area.innerHTML = "<img src='area1.png' alt='背景' width='100%' height='740px'>";
                monster.innerHTML = "<img class='move-left-right' src='スライム.png' alt='背景' width='100%' height='60px'>";
                break;
            default:
                break;
        }
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//敵キャラクターの生成/stage2
function generateEnemy2() {
    //敵のHPと攻撃力を定義
    let types = ['ゾンビ', 'マミー', 'ガーゴイル'];

    //敵キャラクターのランダム取得
    let selected = Math.floor(Math.random() * types.length);
    enemy.name = types[selected];

    let monster = document.getElementById("monster");
    let area = document.getElementById("area");
    switch (enemy.name) {
        case 'ゾンビ':
            enemy.name = 'ゾンビ';
            enemy.hp = 130;
            enemy.attack = 23;
            enemy.maxHP = 130;
            enemy.coin = 1100;
            enemy.level = 13;
            enemy.points = 150;
            area.innerHTML = "<img src='area2.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ゾンビ.png' alt='背景' width='100%' height='200px'>";
            darkNight();
            break;
        case 'マミー':
            enemy.name = 'マミー';
            enemy.hp = 110;
            enemy.attack = 32;
            enemy.maxHP = 110;
            enemy.coin = 1300;
            enemy.level = 15;
            enemy.points = 180;
            area.innerHTML = "<img src='area2.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='マミー.png' alt='背景' width='100%' height='200px'>";
            break;
        case 'ガーゴイル':
            enemy.name = 'ガーゴイル';
            enemy.hp = 250;
            enemy.attack = 35;
            enemy.maxHP = 250;
            enemy.coin = 2000;
            enemy.level = 20;
            enemy.points = 250;
            area.innerHTML = "<img src='area2.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ガーゴイル.png' alt='背景' width='100%' height='350px'>";
            break;
        default:
            break;
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//敵キャラクターの生成/stage3
function generateEnemy3() {
    //敵のHPと攻撃力を定義
    let types = ['雪男', 'スノーフェアリー', 'スノーワイバーン'];

    //敵キャラクターのランダム取得
    let selected = Math.floor(Math.random() * types.length);
    enemy.name = types[selected];

    let monster = document.getElementById("monster");
    let area = document.getElementById("area");
    switch (enemy.name) {
        case '雪男':
            enemy.name = '雪男';
            enemy.hp = 260;
            enemy.attack = 40;
            enemy.maxHP = 260;
            enemy.coin = 2100;
            enemy.level = 24;
            enemy.points = 200;
            area.innerHTML = "<img src='area3.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='雪男.png' alt='背景' width='100%' height='300px'>";
            break;
        case 'スノーフェアリー':
            enemy.name = 'スノーフェアリー';
            enemy.hp = 280;
            enemy.attack = 50;
            enemy.maxHP = 280;
            enemy.coin = 2300;
            enemy.level = 30;
            enemy.points = 220;
            area.innerHTML = "<img src='area3.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='スノーフェアリー.png' alt='背景' width='100%' height='200px'>";
            break;
        case 'スノーワイバーン':
            enemy.name = 'スノーワイバーン';
            enemy.hp = 340;
            enemy.attack = 56;
            enemy.maxHP = 340;
            enemy.coin = 3000;
            enemy.level = 38;
            enemy.points = 300;
            area.innerHTML = "<img src='area3.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='スノーワイバーン.png' alt='背景' width='100%' height='350px'>";
            break;
        default:
            break;
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//敵キャラクターの生成/stage4
function generateEnemy4() {
    //敵のHPと攻撃力を定義
    let types = ['レッドドラゴン', 'ウィッチ', '大天使'];

    //敵キャラクターのランダム取得
    let selected = Math.floor(Math.random() * types.length);
    enemy.name = types[selected];

    let monster = document.getElementById("monster");
    let area = document.getElementById("area");
    switch (enemy.name) {
        case 'レッドドラゴン':
            enemy.name = 'レッドドラゴン';
            enemy.hp = 500;
            enemy.attack = 60;
            enemy.maxHP = 500;
            enemy.coin = 3600;
            enemy.level = 48;
            enemy.points = 380;
            area.innerHTML = "<img src='area4.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='レッドドラゴン.png' alt='背景' width='100%' height='400px'>";
            dragon();
            break;
        case 'ウィッチ':
            enemy.name = 'ウィッチ';
            enemy.hp = 440;
            enemy.attack = 53;
            enemy.maxHP = 440;
            enemy.coin = 3300;
            enemy.level = 42;
            enemy.points = 270;
            area.innerHTML = "<img src='area4.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ウィッチ.png' alt='背景' width='100%' height='300px'>";
            break;
        case '大天使':
            enemy.name = '大天使';
            enemy.hp = 630;
            enemy.attack = 67;
            enemy.maxHP = 630;
            enemy.coin = 5000;
            enemy.level = 55;
            enemy.points = 500;
            area.innerHTML = "<img src='area4.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='大天使.png' alt='背景' width='100%' height='400px'>";
            break;
        default:
            break;
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//敵キャラクターの生成/stage8
function generateEnemy8() {
    //敵のHPと攻撃力を定義
    let types = ['ミステリアスドラゴン', 'ミステリアスバード', 'ミステリアスユニコーン'];

    //敵キャラクターのランダム取得
    let selected = Math.floor(Math.random() * types.length);
    enemy.name = types[selected];

    let monster = document.getElementById("monster");
    let area = document.getElementById("area");
    switch (enemy.name) {
        case 'ミステリアスユニコーン':
            enemy.name = 'ミステリアスユニコーン';
            enemy.hp = 2850;
            enemy.attack = 260;
            enemy.maxHP = 2850;
            enemy.coin = 10000;
            enemy.level = 91;
            enemy.points = 600;
            area.innerHTML = "<img src='area8.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ミステリアスユニコーン.png' alt='背景' width='100%' height='400px'>";
            dragon();
            break;
        case 'ミステリアスバード':
            enemy.name = 'ミステリアスバード';
            enemy.hp = 3000;
            enemy.attack = 280;
            enemy.maxHP = 440;
            enemy.coin = 10000;
            enemy.level = 93;
            enemy.points = 630;
            area.innerHTML = "<img src='area8.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ミステリアスバード.png' alt='背景' width='100%' height='400px'>";
            break;
        case 'ミステリアスドラゴン':
            enemy.name = 'ミステリアスドラゴン';
            enemy.hp = 3330;
            enemy.attack = 300;
            enemy.maxHP = 3330;
            enemy.coin = 10000;
            enemy.level = 95;
            enemy.points = 700;
            area.innerHTML = "<img src='area8.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ミステリアスドラゴン.png' alt='背景' width='100%' height='400px'>";
            break;
        default:
            break;
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//敵キャラクターの生成/stageLast
function generateEnemyLast() {
    //敵のHPと攻撃力を定義
    let types = ['魔王'];

    //敵キャラクターのランダム取得
    let selected = Math.floor(Math.random() * types.length);
    enemy.name = types[selected];

    let monster = document.getElementById("monster");
    let area = document.getElementById("area");
    switch (enemy.name) {
        case '魔王':
            enemy.name = '魔王';
            enemy.hp = 400;
            enemy.attack = 80;
            enemy.maxHP = 400;
            enemy.coin = 10000;
            enemy.level = 70;
            enemy.points = 2000;
            area.innerHTML = "<img src='area5.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='魔王.png' alt='背景' width='100%' height='400px'>";
            break;
        default:
            break;
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//敵キャラクターの生成/extra1
function generateEnemyExtra1() {
    //敵のHPと攻撃力を定義
    let types = ['岩石の番人'];

    //敵キャラクターのランダム取得
    let selected = Math.floor(Math.random() * types.length);
    enemy.name = types[selected];

    let monster = document.getElementById("monster");
    let area = document.getElementById("area");
    switch (enemy.name) {
        case '岩石の番人':
            enemy.name = '岩石の番人';
            enemy.hp = 500;
            enemy.attack = 60;
            enemy.maxHP = 500;
            enemy.coin = 5000;
            enemy.level = 50;
            enemy.points = 1000;
            area.innerHTML = "<img src='extra1.png' alt='背景' width='100%' height='740px'>";
            monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='岩の番人.png' alt='背景' width='100%' height='400px'>";
            break;
        default:
            break;
    }
    //確認ログ（敵:name/HP/attack/maxHP）
    console.log(enemy.name, enemy.hp, enemy.attack, enemy.maxHP);

    let enemyName = document.getElementById("enemyName");
    enemyName.innerHTML = enemy.name;
    let enemyLevel = document.getElementById("enemyLevel");
    enemyLevel.innerHTML = enemy.level;
}

//戦闘メッセージをリアルタイムに画面に表示
function log(message) {
    let battleLog = document.getElementById("battleLog");
    let logBox = document.createElement('p');

    logBox.textContent = message;
    battleLog.appendChild(logBox);
    battleLog.scrollTop = battleLog.scrollHeight;
    battleLogLive.push(message);
}

//プレイヤーの攻撃処理：命中判定ー＞ダメージ計算ー＞敵のHP反映ー＞次のターン移行
function playerAttack() {
    let attackBtn = document.getElementById("attackBtn");
    let defendBtn = document.getElementById("defendBtn");
    let itemsBtn = document.getElementById("itemsBtn");
    attackBtn.disabled = true;
    defendBtn.disabled = true;
    itemsBtn.disabled = true;
    //プレイヤーの攻撃の命中判定（12%の確率で外れる）
    if (Math.random() < 0.12) {
        log("💨" + enemy.name + "は攻撃をかわした！");
        if (enemy.hp <= 0) {
            enemy.hp = 0;
            attackBtn.disabled = false;
            defendBtn.disabled = false;
            itemsBtn.disabled = false;
            updateDisplay();
            endGame("win");
        } else {
            setTimeout(enemyAttack, 600);
        }
    } else {
        let damage = getAttackDamage(player.attack);
        enemy.hp -= damage;
        log("⚔️" + player.name + "の攻撃　→　" + enemy.name + "　に" + damage + "ダメージ！");
        //HPバーを更新
        updateDisplay();
        //敵のHPが0のとき
        if (enemy.hp <= 0) {
            enemy.hp = 0;
            attackBtn.disabled = false;
            defendBtn.disabled = false;
            itemsBtn.disabled = false;
            updateDisplay();
            endGame("win");
        } else {
            setTimeout(enemyAttack, 400);
        }
    }
}

//敵の攻撃処理：命中判定ー＞痛恨ダメージー＞ダメージ算出ー＞プレイヤーのHP反映＋防御時の追加処理
function enemyAttack() {
    let attackBtn = document.getElementById("attackBtn");
    let defendBtn = document.getElementById("defendBtn");
    let itemsBtn = document.getElementById("itemsBtn");
    attackBtn.disabled = true;
    defendBtn.disabled = true;
    itemsBtn.disabled = true;
    let effect = document.getElementById("effect");
    effect.innerHTML = "";
    if (enemy.name === "魔王" && enemy.hp <= 200) {
        let monster = document.getElementById("monster");
        monster.innerHTML = "";
        attackBtn.disabled = false;
        defendBtn.disabled = false;
        itemsBtn.disabled = false;
        changeMaou();
        //守備判定
    } else if (player.defending) {
        //敵の攻撃の命中判定（30%の確率で外れる）
        if (Math.random() < 0.3) {
            const healAmount = Math.floor(Math.random() * 16) + 5; // 5〜20回復
            player.hp += healAmount;
            if (player.hp > player.maxHP) {
                player.hp = player.maxHP;
            }
            player.defending = false;
            log("✨ 防御成功!" + player.name + "のHPが" + healAmount + "回復！");
            //HPバーを更新
            updateDisplay();
            attackBtn.disabled = false;
            defendBtn.disabled = false;
            itemsBtn.disabled = false;
        } else {
            //防御失敗
            let damage = getAttackDamageEnemy(enemy.attack);
            log(enemy.name + "の攻撃　→　" + player.name + "　に" + Math.floor(damage / 2) + "ダメージ！");
            player.hp -= damage / 2;
            player.defending = false;
            //プレイヤーのHPが0のとき
            if (player.hp <= 0) {
                player.hp = 0;
                attackBtn.disabled = false;
                defendBtn.disabled = false;
                itemsBtn.disabled = false;
                updateDisplay();
                endGame("lose");
            }
            attackBtn.disabled = false;
            defendBtn.disabled = false;
            itemsBtn.disabled = false;
            //HPバーを更新
            updateDisplay();
        }
    } else {
        if (Math.random() < 0.12) {
            log("💨" + player.name + "は攻撃をかわした！");
            attackBtn.disabled = false;
            defendBtn.disabled = false;
            itemsBtn.disabled = false;
        } else {
            let damage = getAttackDamageEnemy(enemy.attack);
            player.hp -= damage;
            log(enemy.name + "の攻撃　→　" + player.name + "　に" + damage + "ダメージ！");
            //HPバーを更新
            player.defending = false;
            //プレイヤーのHPが0のとき
            if (player.hp <= 0) {
                player.hp = 0;
                attackBtn.disabled = false;
                defendBtn.disabled = false;
                itemsBtn.disabled = false;
                updateDisplay();
                endGame("lose");
            }
            attackBtn.disabled = false;
            defendBtn.disabled = false;
            itemsBtn.disabled = false;
            updateDisplay();
        }
    }
}
//プレイヤーの攻撃時に使用するダメージの算出（baseは攻撃力）
function getAttackDamage(base) {
    let effect = document.getElementById("effect");
    let critical = (Math.random() < 0.1); //10%
    let damage = Math.floor(Math.random() * (base - 4) + 5); //下限は5、上限はbaseによる
    if (critical) {
        let PerfectStrike = damage * 1.8;
        log("⚡ 会心の一撃！");
        effect.innerHTML = "<img src='gif/kaisin.gif' alt='背景' width='100%' height='200px'>";
        return Math.floor(PerfectStrike);
    }
    effect.innerHTML = "<img src='gif/zangeki.gif' alt='背景' width='100%' height='150px'>";
    return Math.floor(damage);
}

//敵の攻撃時に使用するダメージの算出（baseは攻撃力）
function getAttackDamageEnemy(base) {
    let critical = (Math.random() < 0.1); //10%
    let damage = Math.floor(Math.random() * (base - 4) + 5); //下限は5、上限はbaseによる
    if (critical) {
        let monster = document.getElementById("monster");
        monster.classList.add("tukon");
        let PerfectStrike = damage * 1.8;
        log("⚠️ " + enemy.name + "の痛恨の一撃をくらう！");
        return Math.floor(PerfectStrike);
    }
    return damage;
}

//プレイヤーの防御時の操作
function defendAction() {
    if (player.end) {
        alert("宝箱を開けよう！");
    } else {
        player.defending = true;
        log(player.name + "は防御の体勢に入った！");
        setTimeout(enemyAttack, 600);
    }
}

//プレイヤーのポーション使用時の操作
function usePotion() {
    let attackBtn = document.getElementById("attackBtn");
    let defendBtn = document.getElementById("defendBtn");
    let itemsBtn = document.getElementById("itemsBtn");
    attackBtn.disabled = true;
    defendBtn.disabled = true;
    itemsBtn.disabled = true;
    if (player.hpPotion <= 0) {
        alert("ポーションがないようだ…");
        attackBtn.disabled = false;
        defendBtn.disabled = false;
        itemsBtn.disabled = false;
    } else if (enemy.name === 'ミステリアスドラゴン' || enemy.name === 'ミステリアスバード' || enemy.name === 'ミステリアスユニコーン') {
        alert(enemy.name + "の神秘的な力でポーションが使えない");
        attackBtn.disabled = false;
        defendBtn.disabled = false;
        itemsBtn.disabled = false;
    } else {
        player.hp += player.maxHP / 4;
        if (player.hp > player.maxHP) {
            player.hp = player.maxHP;
        }
        player.hpPotion -= 1;
        log(player.name + "はポーションを使った！ HPが" + Math.floor(player.maxHP / 4) + "回復！");
        attackBtn.disabled = false;
        defendBtn.disabled = false;
        itemsBtn.disabled = false;
        updateDisplay();
    }
}

//プレイヤーと敵のHP状態を画面に反映し、HPバーを更新
function updateDisplay() {
    const entities = [{ obj: player, barId: "playerHPBar", textId: "playerHP" }, { obj: enemy, barId: "enemyHPBar", textId: "enemyHP" }];
    //読み込み確認
    console.log("updateDisplay");
    entities.forEach(({ obj, barId, textId }) => {
        const percent = Math.floor(obj.hp / obj.maxHP * 100);
        const barEl = document.getElementById(barId);
        const txtEl = document.getElementById(textId);

        txtEl.textContent = Math.floor(obj.hp);
        barEl.textContent = percent + "%";
        barEl.style.width = percent + "%";

        barEl.classList.remove("high", "mid", "low");

        if (percent >= 50) {
            barEl.classList.add("high");
        } else if (percent <= 20) {
            barEl.classList.add("low");
        } else {
            barEl.classList.add("mid");
        }
    });
}

// 例：Lv1=100, Lv2=120, Lv3=140,...
function getRequiredExp(level) {
    return Math.floor(100 + (level - 1) * 20);
}

//プレイヤーの経験値を画面に反映し、経験値バーを更新
function updatePointsDisplay() {
    let playerPointsBar = document.getElementById("playerPointsBar");
    player.points += enemy.points;

    while (player.points >= getRequiredExp(player.level)) {
        player.points -= getRequiredExp(player.level);
        player.level += 1;
        let levelUpShow = document.getElementById("levelUpShow");
        levelUpShow.style.display = "block";
        let levelup = document.getElementById("levelup");
        levelup.innerHTML = player.level;
        player.maxHP += 5;
        player.attack += 3;
        levelUP();
    }

    // 経験値バーの更新（割合表示）
    const nextExp = getRequiredExp(player.level);
    const percent = Math.floor((player.points / nextExp) * 100);
    playerPointsBar.style.width = percent + "%";
}

//勝敗に応じたゲーム終了処理を行い、ログの保存・履歴表示・画面遷移を実行
function endGame(result) {
    let effect = document.getElementById("effect");
    effect.innerHTML = "";
    //let monster = document.getElementById("monster");
    player.end = true;

    if (result === "win") {
        log("🎉 勝利！ " + player.name + "に勝利した！");
        //join()メソッドは、配列の要素を指定した区切り文字で結合し、1つの文字列として返す
        sessionLogs.push(battleLogLive.join("\n"));
        player.coin += enemy.coin;
        let extra1 = document.getElementById("extra1");
        let stageLast = document.getElementById("stageLast");
        let gameClearPanel = document.getElementById('gameClearPanel');
        gameClearPanel.style.display = "none";
        if (enemy.name === 'ゲベロペ') {
            flg.stage2 = true;
        } else if (enemy.name === 'ガーゴイル') {
            flg.stage3 = true;
        } else if (enemy.name === 'スノーワイバーン') {
            if (flg.extra1Win) {
                flg.extra1 = false;
                extra1.style.display = "none";
            } else {
                flg.extra1 = true;
                extra1.style.display = "block";
            }
        } else if (enemy.name === '岩石の番人') {
            extra1.style.display = "none";
            flg.extra1Win = true;
            flg.stage4 = true;
            flg.castle = true;
        } else if (enemy.name === '大天使') {
            if (flg.stageLastWin) {
                flg.stageLast = false;
                stageLast.style.display = "none";
            } else {
                flg.stageLast = true;
                stageLast.style.display = "block";
            }
        } else if (enemy.name === '魔王(2)') {
            stageLast.style.display = "none";
            flg.stageLastWin = true;
            let gameClearPanel = document.getElementById('gameClearPanel');
            gameClearPanel.style.display = "block";
            let kumo = document.getElementById("kumo");
            kumo.style.display = "none";
        }
        displaySessionLogs();
        win();
        //monster.innerHTML = "<img onclick='win()' class='animate__animated animate__fadeIn' src='coin_gold_02.png' alt='背景' width='100%' height='100px'>";
    } else {
        player.points = 0;
        //経験値の反映
        log("💀 敗北… " + enemy.name + "に負けた。")
        //join()メソッドは、配列の要素を指定した区切り文字で結合し、1つの文字列として返す
        sessionLogs.push(battleLogLive.join("\n"));
        flg.stage2 = false;
        flg.stage3 = false;
        flg.stage4 = false;
        flg.stage8 = false;
        flg.stageLast = false;
        flg.castle = false;
        flg.extra1 = false;
        flg.extra1Win = false;
        flg.stageLastWin = false;
        displaySessionLogs();
        end();
    }
}

//戦闘後勝利時の処理
function win() {
    let nextBattle = document.getElementById('nextBattle');

    if (player.stage === 'last') {
        nextBattle.style.display = "none";
    } else if (player.stage === 4) {
        nextBattle.style.display = "block";
    } else if (player.stage === 3) {
        nextBattle.style.display = "block";
    } else if (player.stage === 2) {
        nextBattle.style.display = "block";
    } else if (player.stage === 'ex1') {
        nextBattle.style.display = "none";
    } else {
        nextBattle.style.display = "block";
    }

    if (player.level % 10 == 0) {
        player.bonus = true;
    } else {
        player.bonus = false;
    }
    //経験値の反映
    updatePointsDisplay();
    let rareItems = document.getElementById("rareItems");
    let rare = (Math.random() < 0.1);
    if (rare) {
        player.hpPotion += 1;
        rareItems.innerHTML = "治癒のポーション × 1";
    } else {
        rareItems.innerHTML = "なし";
    }
    let lose = document.getElementById("lose");
    lose.style.display = "none";
    let win = document.getElementById("win");
    win.style.display = "block";
    let monster = document.getElementById("monster");
    monster.innerHTML = "";
    let sectionIds = [];
    let winName = document.getElementById("winName");
    winName.innerHTML = enemy.name;
    let winGold = document.getElementById("winGold");
    winGold.innerHTML = enemy.coin;
    let winPoints = document.getElementById("winPoints");
    winPoints.innerHTML = enemy.points;
    gameUI = document.getElementById("gameUI");
    logPanel = document.getElementById("logPanel");
    //ログパネルの表示
    let sessionLogPanel = document.getElementById("sessionLogPanel");
    let restartMenu = document.getElementById("restartMenu");
    sectionIds.push(sessionLogPanel.id, restartMenu.id, gameUI.id, logPanel.id);
    showSection(sectionIds);
}

//戦闘後敗北時の処理
function end() {
    enemy.coin = 0;
    let win = document.getElementById("win");
    win.style.display = "none";
    let lose = document.getElementById("lose");
    lose.style.display = "block";
    let eName = document.getElementById("eName");
    eName.innerHTML = enemy.name;
    let resultLevel = document.getElementById("resultLevel");
    resultLevel.innerHTML = player.level;
    let resultName = document.getElementById("resultName");
    resultName.innerHTML = player.name;
    let HP = document.getElementById("resultHP");
    resultHP.innerHTML = player.maxHP;
    let resultAttack = document.getElementById("resultAttack");
    resultAttack.innerHTML = player.attack;
    let resultCoin = document.getElementById("resultCoin");
    resultCoin.innerHTML = player.coin;
    let sectionIds = [];
    gameUI = document.getElementById("gameUI");
    logPanel = document.getElementById("logPanel");
    let sessionLogPanel = document.getElementById("sessionLogPanel");
    let restartMenu = document.getElementById("restartMenu");
    sectionIds.push(sessionLogPanel.id, restartMenu.id, gameUI.id, logPanel.id);
    showSection(sectionIds);
}

//mapに戻る
function mapGame() {
    //Start画面に遷移
    let levelUpShow = document.getElementById("levelUpShow");
    levelUpShow.style.display = "none";
    let sectionIds = [];
    let map = document.getElementById("map");
    sectionIds.push(map.id);
    showSection(sectionIds);
}

//ゲームの再プレイの準備処理（入力欄、ログの初期化・画面の戻し）
function titleGame() {
    let gameClearPanel = document.getElementById('gameClearPanel');
    gameClearPanel.style.display = "none";
    let levelUpShow = document.getElementById("levelUpShow");
    levelUpShow.style.display = "none";
    let kumo = document.getElementById("kumo");
    kumo.style.display = "block";
    let playerInput = document.getElementById("playerInput");
    playerInput.value = null;
    player.level = 1;
    player.maxHP = 50;
    player.hp = 50;
    player.attack = 10;
    player.bonus = true;
    player.coin = 10;
    player.stage = 1;
    player.points = 0;
    player.hpPotion = 3;
    player.pwPotion = 0;
    player.hpupPotion = 0;
    enemy.points = 0;
    battleLogLive = [];
    flg.stage2 = false;
    flg.stage3 = false;
    flg.stage4 = false;
    flg.stage8 = false;
    flg.stageLast = false;
    flg.stageLastWin = false;
    flg.castle = false;
    flg.extra1 = false;
    flg.extra1Win = false;
    updatePointsDisplay();
    //Start画面に遷移
    let sectionIds = [];
    let startMenu = document.getElementById("startMenu");
    sectionIds.push(startMenu.id);
    showSection(sectionIds);
}

//データを保持したまま、ゲームを再開する
function restartGame() {
    let nextBattle = document.getElementById('nextBattle');
    let levelUpShow = document.getElementById("levelUpShow");
    levelUpShow.style.display = "none";
    battleLogLive = [];
    //ゲーム画面に遷移
    if (player.stage === 'last') {
        nextBattle.style.display = "none";
    } else if (player.stage === 8) {
        startGames8();
    } else if (player.stage === 4) {
        startGames4();
    } else if (player.stage === 3) {
        startGames3();
    } else if (player.stage === 2) {
        startGames2();
    } else if (player.stage === 'ex1') {
        nextBattle.style.display = "none";
    } else {
        startGames1();
    }
}

//セッションログ表示
function displaySessionLogs() {
    let sessionArea = document.getElementById("sessionLogPanel");
    sessionArea.innerHTML = "<div style='color:white;'>＜セッション戦闘履歴＞</div>";
    sessionLogs.forEach((log, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<div class='rireki'>🗂️ 戦闘${index + 1}<span class='btn-wrapper'><button class='startBtn' id='showBtn${index}' onclick='showPanel(${index})'>↓</button><button class='startBtn' id='hiddenBtn${index}' onclick='hiddenPanel(${index})' style='display: none;'>↑</button></span></div><pre id='pre${index}' style='display: none;'>${log}</pre>`;
        sessionArea.appendChild(div);
    });
}

//セクションパネルを開く
function showPanel(index) {
    let hiddenBtn = document.getElementById("hiddenBtn" + index);
    hiddenBtn.style.display = "block";
    let showBtn = document.getElementById("showBtn" + index);
    showBtn.style.display = "none";
    let pre = document.getElementById("pre" + index);
    pre.style.display = "block";
}

//セクションパネルを閉じる
function hiddenPanel(index) {
    let showBtn = document.getElementById("showBtn" + index);
    showBtn.style.display = "block";
    let pre = document.getElementById("pre" + index);
    pre.style.display = "none";
    let hiddenBtn = document.getElementById("hiddenBtn" + index);
    hiddenBtn.style.display = "none";
}

//これまでのセッションログをテキスト形式で保存・ダウンロードする
function downloadSessionLog() {
    let sessionLogsAll = sessionLogs.join("\n\n === 次戦 === \n\n");
    const blob = new Blob([sessionLogsAll], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "session_log.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

//操作方法の表示
function showInstructions() {
    let sectionIds = [];
    startMenu = document.getElementById("startMenu");
    instructionsPanel = document.getElementById("instructionsPanel");
    sectionIds.push(startMenu.id, instructionsPanel.id);
    showSection(sectionIds);
}

//敵一覧の表示
function showEnemyList() {
    let sectionIds = [];
    startMenu = document.getElementById("startMenu");
    enemyListPanel = document.getElementById("enemyListPanel");
    sectionIds.push(startMenu.id, enemyListPanel.id);
    showSection(sectionIds);
}

//アイテム屋の表示
function itemshop() {
    let sectionIds = [];
    let itemshop = document.getElementById("itemshop");
    sectionIds.push(itemshop.id);
    showSection(sectionIds);
}

//鍛冶屋の表示
function weaponshop() {
    alert("今はやってないみたい…");
    // let sectionIds = [];
    // let weaponshop = document.getElementById("weaponshop");
    // sectionIds.push(weaponshop.id);
    // showSection(sectionIds);
}

//パネルを閉じる（例：操作説明、ルールなど）
function closePanel() {
    let sectionIds = [];
    startMenu = document.getElementById("startMenu");
    sectionIds.push(startMenu.id);
    showSection(sectionIds);
}

function closeClearPanel() {
    let gameClearPanel = document.getElementById('gameClearPanel');
    gameClearPanel.style.display = "none";
    let sectionIds = [];
    startMenu = document.getElementById("map");
    sectionIds.push(startMenu.id);
    showSection(sectionIds);
}

//魔王のHPが50%を切ったら、変身する
function changeMaou() {
    let hensin = document.getElementById("effect");
    hensin.innerHTML = "<img src='gif/hensin.gif' alt='背景' width='300px' height='300px'>";
    log(enemy.name + "の姿が変化した…");
    let monster = document.getElementById("monster");
    monster.innerHTML = "<img class='animate__animated animate__infinite animate__pulse' src='魔王2.png' alt='背景' width='100%' height='400px'>";
    enemy.name = "魔王(2)"
    enemy.attack = 100;
    enemy.maxHP = 666;
    enemy.hp += 666;
    if (enemy.hp > enemy.maxHP) {
        enemy.hp = enemy.maxHP;
    }
    //HPバーを更新
    updateDisplay();
}

//モンスターから逃げる機能
function runAway() {
    let sectionIds = [];
    if (enemy.hp != enemy.maxHP || player.hp != player.maxHP) {
        alert(enemy.name + "から逃げることはできない。");
    } else {
        alert(enemy.name + "から逃げました。");
        map = document.getElementById("map");
        sectionIds.push(map.id);
        showSection(sectionIds);
    }
}

//10%の確率で（スライム）のレアモンスターが出現
function slime() {
    let rare = (Math.random() < 0.1);
    if (rare) {
        enemy.name = 'レッドスライム';
        enemy.hp = 150;
        enemy.attack = 50;
        enemy.maxHP = 150;
        enemy.coin *= 2;
        enemy.level = 30;
        enemy.points = 350;
        area.innerHTML = "<img src='area1.png' alt='背景' width='100%' height='740px'>";
        monster.innerHTML = "<img class='move-left-right' src='レッドスライム.png' alt='背景' width='100%' height='50px'>";
    }
}

//10%の確率で（ゾンビ）のレアモンスターが出現
function darkNight() {
    let rare = (Math.random() < 0.1);
    if (rare) {
        enemy.name = 'ダークナイト';
        enemy.hp = 400;
        enemy.attack = 55;
        enemy.maxHP = 400;
        enemy.coin *= 2;
        enemy.level = 45;
        enemy.points = 550;
        area.innerHTML = "<img src='area2.png' alt='背景' width='100%' height='740px'>";
        monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ダークナイト.png' alt='背景' width='100%' height='300px'>";
    }
}

//10%の確率で（レッドドラゴン）のレアモンスターが出現
function dragon() {
    let rare = (Math.random() < 0.1);
    if (rare) {
        enemy.name = 'ホワイトドラゴン';
        enemy.hp = 850;
        enemy.attack = 120;
        enemy.maxHP = 850;
        enemy.coin *= 2;
        enemy.level = 75;
        enemy.points = 1000;
        area.innerHTML = "<img src='area4.png' alt='背景' width='100%' height='740px'>";
        monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ホワイトドラゴン.png' alt='背景' width='100%' height='400px'>";
    }
}

//10%の確率で（魔王）のレアモンスターが出現
// function devil() {
//     let rare = (Math.random() < 0.1);
//     if (rare) {
//         enemy.name = 'ダークドラゴン';
//         enemy.hp = 2000;
//         enemy.attack = 250;
//         enemy.maxHP = 2000;
//         enemy.coin *= 2;
//         enemy.level = 90;
//         enemy.points = 500;
//         area.innerHTML = "<img src='area5.png' alt='背景' width='100%' height='740px'>";
//         monster.innerHTML = "<img class='animate__animated animate__fadeIn' src='ダークドラゴン.png' alt='背景' width='100%' height='400px'>";
//     }
// }

//レベルが10上がるごとにボーナスを適用
function levelUP() {
    if (player.bonus && player.level % 10 === 0) {
        alert("レベルアップボーナス！！！");
        if (player.level >= 100) {
            player.maxHP += 20;
            player.attack += 20;
        } else if (player.level >= 90) {
            player.maxHP += 10;
            player.attack += 10;
        } else if (player.level >= 80) {
            player.maxHP += 10;
            player.attack += 10;
        } else if (player.level >= 70) {
            player.maxHP += 10;
            player.attack += 10;
        } else if (player.level >= 60) {
            player.maxHP += 10;
            player.attack += 10;
        } else if (player.level >= 50) {
            player.maxHP += 10;
            player.attack += 10;
        } else if (player.level >= 40) {
            player.maxHP += 5;
            player.attack += 5;
        } else if (player.level >= 30) {
            player.maxHP += 5;
            player.attack += 5;
        } else if (player.level >= 20) {
            player.maxHP += 5;
            player.attack += 5;
        } else if (player.level >= 10) {
            player.maxHP += 5;
            player.attack += 5;
        }

        player.bonus = false;  // ボーナス適用後はリセット
    }
}
