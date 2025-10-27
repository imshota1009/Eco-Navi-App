// --- DOM Elements (initialized in initGamification) ---
let ecoPointsDisplayValue;
let openPointStoreBtn;
let openThemeModalBtn; 

// --- Constants ---
const STORE_ITEMS = {
    // --- 通常テーマ ---
    'bg-spring': { name: '季節の背景: 春', price: 10, type: 'background', image: 'images/spring.png' },
    'bg-summer': { name: '季節の背景: 夏', price: 10, type: 'background', image: 'images/summer.png' },
    'bg-fall': { name: '季節の背景: 秋', price: 10, type: 'background', image: 'images/fall.png' },
    'bg-winter': { name: '季節の背景: 冬', price: 10, type: 'background', image: 'images/winter.png' },
    
    // --- イベントテーマ (販売期間付き) ---
    'bg-fresh-green': { name: 'イベント背景: 新緑', price: 20, type: 'background', image: 'images/fresh-green.png', season: 'spring' },
    'bg-fireworks': { name: 'イベント背景: 花火', price: 20, type: 'background', image: 'images/fireworks.png', season: 'summer' },
    'bg-summer-clouds': { name: 'イベント背景: 入道雲', price: 20, type: 'background', image: 'images/summer-clouds.png', season: 'summer' },
    'bg-autumn-reading': { name: 'イベント背景: 読書の秋', price: 20, type: 'background', image: 'images/autumn-reading.png', season: 'autumn' },
    'bg-snowy': { name: 'イベント背景: 雪景色', price: 20, type: 'background', image: 'images/snowy-landscape.png', season: 'winter' },
    'bg-new-year': { name: 'イベント背景: 新年', price: 20, type: 'background', image: 'images/new-year.png', season: 'winter' },
};

const LS_KEYS = {
    POINTS: 'ecoNaviPoints',
    PURCHASED: 'ecoNaviPurchasedItems',
    APPLIED_THEME: 'ecoNaviAppliedTheme',
    LAST_LOGIN: 'ecoNaviLastLogin',
    LAST_TIPS_VIEW: 'ecoNaviLastTipsView'
};

/**
 * 現在のエコポイント数を取得します。
 * @returns {number} 現在のポイント数
 */
function getEcoPoints() {
    return parseInt(localStorage.getItem(LS_KEYS.POINTS) || '0', 10);
}

/**
 * エコポイントを保存し、表示を更新します。
 * @param {number} points - 保存する新しいポイント数
 */
function saveEcoPoints(points) {
    localStorage.setItem(LS_KEYS.POINTS, points);
    updatePointsDisplay();
}

/**
 * ヘッダーのポイント表示を更新します。
 */
function updatePointsDisplay() {
    if (ecoPointsDisplayValue) {
        ecoPointsDisplayValue.textContent = getEcoPoints();
    }
}

/**
 * エコポイントを追加します。
 * @param {number} pointsToAdd - 追加するポイント数
 * @param {string} reason - ポイントが追加された理由（ログ用）
 */
function addEcoPoints(pointsToAdd, reason) {
    const currentPoints = getEcoPoints();
    const newPoints = currentPoints + pointsToAdd;
    saveEcoPoints(newPoints);
    console.log(`Points Added: +${pointsToAdd} for ${reason}. New total: ${newPoints}`);
    // index.htmlで定義されているグローバル関数を呼び出す
    if (typeof showToast === 'function') {
        showToast(`+${pointsToAdd}P 獲得！ (${reason})`, 2500);
    }
}

/**
 * 今日の日付を 'YYYY-MM-DD' 形式で取得します。
 * @returns {string} 今日の日付文字列
 */
function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * 毎日の初回ログイン時にポイントを付与します。
 */
function checkDailyLogin() {
    const lastLogin = localStorage.getItem(LS_KEYS.LAST_LOGIN);
    const today = getTodayDateString();
    if (lastLogin !== today) {
        addEcoPoints(1, '今日の初回ログイン');
        localStorage.setItem(LS_KEYS.LAST_LOGIN, today);
    }
}

/**
 * エコ豆知識の閲覧時にポイントを付与します（1日1回まで）。
 * この関数は index.html の openTipsBtn のイベントリスナーから呼ばれます。
 */
function handleViewTips() {
    const lastView = localStorage.getItem(LS_KEYS.LAST_TIPS_VIEW);
    const today = getTodayDateString();
    if (lastView !== today) {
        addEcoPoints(5, 'エコ豆知識を閲覧');
        localStorage.setItem(LS_KEYS.LAST_TIPS_VIEW, today);
    }
}

/**
 * 購入済みのアイテムリストを取得します。
 * @returns {string[]} 購入済みアイテムのIDリスト
 */
function getPurchasedItems() {
    return JSON.parse(localStorage.getItem(LS_KEYS.PURCHASED) || '[]');
}

/**
 * テーマを適用します。
 * @param {string | null} themeId - 適用するテーマのID。nullの場合はデフォルトに戻します。
 */
function applyTheme(themeId) {
    const themeClasses = Object.keys(STORE_ITEMS).filter(key => STORE_ITEMS[key].type === 'background');
    document.body.classList.remove(...themeClasses);
    document.body.style.backgroundImage = ''; 

    if (themeId && STORE_ITEMS[themeId]) {
        const item = STORE_ITEMS[themeId];
        document.body.classList.add(themeId);
        if (item.type === 'background') {
            document.body.style.backgroundImage = `url('${item.image}')`;
        }
        localStorage.setItem(LS_KEYS.APPLIED_THEME, themeId);
    } else {
        localStorage.removeItem(LS_KEYS.APPLIED_THEME);
    }
}


/**
 * アイテムが現在の季節で購入可能か判定します。
 * @param {object} item - ストアアイテムオブジェクト
 * @returns {boolean} - 購入可能であればtrue
 */
function isItemAvailable(item) {
    if (!item.season) {
        return true; // `season`プロパティがなければ常時販売
    }
    const currentMonth = new Date().getMonth(); // 0 (1月) から 11 (12月)
    switch (item.season) {
        case 'spring': return [2, 3, 4].includes(currentMonth); // 3月, 4月, 5月
        case 'summer': return [5, 6, 7].includes(currentMonth); // 6月, 7月, 8月
        case 'autumn': return [8, 9, 10].includes(currentMonth); // 9月, 10月, 11月
        case 'winter': return [11, 0, 1].includes(currentMonth); // 12月, 1月, 2月
        default: return false;
    }
}


/**
 * ポイントストアのモーダル内のアイテムリストを描画します。
 */
function renderPointStore() {
    const container = document.getElementById('point-store-items');
    if (!container) return;
    
    const currentPoints = getEcoPoints();
    const purchasedItems = getPurchasedItems();
    const appliedTheme = localStorage.getItem(LS_KEYS.APPLIED_THEME);

    // 現在購入可能なアイテムのみをフィルタリング
    const availableItems = Object.entries(STORE_ITEMS).filter(([id, item]) => isItemAvailable(item));

    if (availableItems.length === 0) {
            container.innerHTML = `<p class="text-center text-sm text-gray-500 col-span-full">現在購入できるアイテムはありません。</p>`;
            return;
    }

    container.innerHTML = availableItems.map(([id, item]) => {
        const isPurchased = purchasedItems.includes(id);
        const canAfford = currentPoints >= item.price;
        const isApplied = appliedTheme === id;

        let buttonHtml;
        if (isApplied) {
            buttonHtml = `<button class="w-full text-sm font-bold py-2 px-4 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed" disabled>適用中</button>`;
        } else if (isPurchased) {
            buttonHtml = `<button class="w-full text-sm font-bold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition" onclick="applyTheme('${id}'); renderThemeSwitcher(); renderPointStore();">適用する</button>`;
        } else if (canAfford) {
            buttonHtml = `<button class="w-full text-sm font-bold py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition" onclick="handleBuyItem('${id}')">購入する</button>`;
        } else {
            buttonHtml = `<button class="w-full text-sm font-bold py-2 px-4 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed" disabled>ポイント不足</button>`;
        }

        return `
            <div class="border rounded-lg p-4 flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-gray-800">${item.name}</h3>
                    <p class="text-sm text-yellow-600 font-semibold my-2">${item.price} P</p>
                </div>
                ${buttonHtml}
            </div>
        `;
    }).join('');
}


/**
 * アイテム購入の処理をします。
 * @param {string} itemId - 購入するアイテムのID
 */
function handleBuyItem(itemId) {
    const item = STORE_ITEMS[itemId];
    if (!item) return;

    const currentPoints = getEcoPoints();
    if (currentPoints < item.price) {
        if (typeof showToast === 'function') {
            showToast('ポイントが不足しています。', 3000);
        }
        return;
    }

    const purchasedItems = getPurchasedItems();
    if (purchasedItems.includes(itemId)) return; 

    // ポイントを減算
    saveEcoPoints(currentPoints - item.price);

    // 購入済みリストに追加
    purchasedItems.push(itemId);
    localStorage.setItem(LS_KEYS.PURCHASED, JSON.stringify(purchasedItems));

    // すぐにテーマを適用
    applyTheme(itemId);

    // ストアの表示を更新
    renderPointStore();
    renderThemeSwitcher();
}

/**
 * テーマ設定モーダルの中身を描画します。
 */
function renderThemeSwitcher() {
    const container = document.getElementById('theme-list-container');
    if (!container) return;

    const purchasedItems = getPurchasedItems();
    const appliedTheme = localStorage.getItem(LS_KEYS.APPLIED_THEME);
    
    const purchasedThemes = purchasedItems.filter(id => STORE_ITEMS[id]);

    let themesHtml = '';
    if (purchasedThemes.length > 0) {
        themesHtml = purchasedThemes.map(id => {
            const item = STORE_ITEMS[id];
            const isApplied = appliedTheme === id;
            const buttonHtml = isApplied
                ? `<button class="text-sm font-semibold text-gray-500" disabled>適用中</button>`
                : `<button class="text-sm font-semibold text-green-600 hover:text-green-800" onclick="applyTheme('${id}'); renderThemeSwitcher();">適用</button>`;
            
            return `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span>${item.name}</span>
                    ${buttonHtml}
                </div>
            `;
        }).join('');
    } else {
        themesHtml = `<p class="text-center text-sm text-gray-500 col-span-full">購入済みのテーマはありません。</p>`;
    }

    const isDefaultApplied = !appliedTheme;
    const resetButtonHtml = `
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg mt-4 border-t pt-4">
            <span>デフォルトテーマ</span>
            ${isDefaultApplied
                ? `<button class="text-sm font-semibold text-gray-500" disabled>適用中</button>`
                : `<button class="text-sm font-semibold text-green-600 hover:text-green-800" onclick="applyTheme(null); renderThemeSwitcher();">適用</button>`
            }
        </div>`;

    container.innerHTML = themesHtml + resetButtonHtml;
}


// ===================================================
// <<< 育てるエコアイランド機能 追記ブロック >>>
// ===================================================

// --- DOM Elements (Eco Island) ---
// (initGamification 内で定義されます)
let openIslandBtn; 

// --- Constants (Eco Island) ---
const LS_SORT_COUNT = 'ecoNaviSortCount'; // 分別回数のLocalStorageキー

// --- Island SVG Definitions ---
// 各レベルのSVGデータ（シンプルなダミー）
const ISLAND_SVG = {
    LEVEL_0: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M10,50 Q50,30 90,50 T10,50 Z" fill="#D2B48C" stroke="#8B4513" stroke-width="1"></path><text x="50" y="45" font-size="5" text-anchor="middle" fill="#708090">ゴミ...</text><path d="M30 45 l2 2 M32 45 l-2 2" stroke="#A9A9A9" stroke-width="0.5"></path><path d="M70 42 l3 3 M73 42 l-3 3" stroke="#A9A9A9" stroke-width="0.5"></path></svg>`,
    LEVEL_1: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M10,50 Q50,30 90,50 T10,50 Z" fill="#90EE90" stroke="#228B22" stroke-width="1"></path><line x1="50" y1="40" x2="50" y2="35" stroke="#228B22" stroke-width="1"></line><path d="M48,35 Q50,33 52,35 Z" fill="#32CD32"></path><text x="50" y="55" font-size="4" text-anchor="middle" fill="#006400">新芽 (5回)</text></svg>`,
    LEVEL_2: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M10,50 Q50,30 90,50 T10,50 Z" fill="#32CD32" stroke="#228B22" stroke-width="1"></path><rect x="45" y="40" width="10" height="8" fill="#F5DEB3" stroke="#8B4513"></rect><path d="M43 40 L50 35 L57 40 Z" fill="#A0522D"></path><line x1="30" y1="45" x2="30" y2="35" stroke="#228B22" stroke-width="2"></line><circle cx="30" cy="33" r="4" fill="#008000"></circle><line x1="70" y1="45" x2="70" y2="38" stroke="#228B22" stroke-width="2"></line><circle cx="70" cy="36" r="4" fill="#008000"></circle></svg>`,
    LEVEL_3: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M10,50 Q50,30 90,50 T10,50 Z" fill="#008000" stroke="#006400" stroke-width="1"></path><rect x="35" y="40" width="12" height="10" fill="#FFF8DC" stroke="#D2691E"></rect><path d="M33 40 L41 34 L49 40 Z" fill="#B22222"></path><rect x="55" y="38" width="15" height="12" fill="#F0F8FF" stroke="#4682B4"></rect><path d="M53 38 L62.5 32 L72 38 Z" fill="#4682B4"></path><line x1="20" y1="45" x2="20" y2="35" stroke="#228B22" stroke-width="2"></line><circle cx="20" cy="33" r="5" fill="#2E8B57"></circle><line x1="80" y1="45" x2="80" y2="32" stroke="#228B22" stroke-width="3"></line><circle cx="80" cy="30" r="6" fill="#2E8B57"></circle></svg>`,
    LEVEL_4: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M10,50 Q50,30 90,50 T10,50 Z" fill="#40E0D0" stroke="#008080" stroke-width="1"></path><rect x="30" y="35" width="15" height="15" fill="#E6E6FA" stroke="#483D8B"></rect><rect x="55" y="30" width="20" height="20" fill="#FFFFFF" stroke="#00CED1"></rect><path d="M55 30 L65 25 L75 30 Z" fill="#AFEEEE"></path><line x1="20" y1="45" x2="20" y2="30" stroke="#228B22" stroke-width="3"></line><circle cx="20" cy="28" r="7" fill="#3CB371"></circle><line x1="80" y1="45" x2="80" y2="25" stroke="#228B22" stroke-width="4"></line><circle cx="80" cy="23" r="8" fill="#3CB371"></circle><path d="M15 48 A 5 5 0 0 1 25 48" stroke="#FFD700" stroke-width="1.5" fill="none"></path><path d="M75 48 A 5 5 0 0 0 85 48" stroke="#FF69B4" stroke-width="1.5" fill="none"></path></svg>`
};

/**
 * 現在の分別回数を取得します。
 * @returns {number} 分別回数
 */
function getSortCount() {
    return parseInt(localStorage.getItem(LS_SORT_COUNT) || '0', 10);
}

/**
 * 分別回数を1増やし、LocalStorageに保存し、島を再描画します。
 * (index.html の handleFile から呼び出されます)
 */
function incrementSortCountAndRenderIsland() {
    const currentCount = getSortCount();
    localStorage.setItem(LS_SORT_COUNT, currentCount + 1);
    
    // 島モーダルが開いている場合のみ即時更新する
    const islandModal = document.getElementById('island-modal');
    if (islandModal && !islandModal.classList.contains('hidden')) {
         renderIsland();
    }
}

/**
 * 島のレベルを判定します。
 * @param {number} count - 分別回数
 * @returns {object} - { level: number, name: string, svg: string }
 */
function getIslandLevel(count) {
    if (count >= 50) {
        return { level: 4, name: 'レベル4: 楽園', svg: ISLAND_SVG.LEVEL_4 };
    } else if (count >= 30) {
        return { level: 3, name: 'レベル3: 発展', svg: ISLAND_SVG.LEVEL_3 };
    } else if (count >= 15) {
        return { level: 2, name: 'レベル2: 成長', svg: ISLAND_SVG.LEVEL_2 };
    } else if (count >= 5) {
        return { level: 1, name: 'レベル1: 新芽', svg: ISLAND_SVG.LEVEL_1 };
    } else {
        return { level: 0, name: 'レベル0: 初期状態', svg: ISLAND_SVG.LEVEL_0 };
    }
}

/**
 * 「育てるエコアイランド」モーダルの中身を描画します。
 */
function renderIsland() {
    const displayArea = document.getElementById('island-display-area');
    const countDisplay = document.getElementById('island-sort-count');
    const levelDisplay = document.getElementById('island-level-desc');

    if (!displayArea || !countDisplay || !levelDisplay) {
        // モーダル要素がまだ読み込まれていないか、見つからない場合は何もしない
        return;
    }

    const currentCount = getSortCount();
    const island = getIslandLevel(currentCount);

    displayArea.innerHTML = island.svg;
    countDisplay.textContent = currentCount;
    levelDisplay.textContent = island.name;
}
// ===================================================
// <<< 追記ブロック ここまで >>>
// ===================================================


/**
 * ゲーミフィケーション機能の初期化（エコアイランド機能の初期化を含む）
 */
function initGamification() {
    // DOM要素を取得
    ecoPointsDisplayValue = document.getElementById('eco-points-display-value');
    openPointStoreBtn = document.getElementById('open-point-store-btn');
    openThemeModalBtn = document.getElementById('open-theme-modal-btn');
    openIslandBtn = document.getElementById('open-island-btn'); // ★ 追記
    
    // ポイント表示を初期化
    updatePointsDisplay();

    // デイリーログインボーナスをチェック
    checkDailyLogin();
    
    // 保存されたテーマを適用
    const savedTheme = localStorage.getItem(LS_KEYS.APPLIED_THEME);
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    // ストアボタンのイベントリスナーを設定
    if (openPointStoreBtn) {
        openPointStoreBtn.addEventListener('click', () => {
            renderPointStore();
            // index.htmlで定義されているグローバル関数を呼び出す
            if(typeof openModal === 'function') openModal('point-store-modal');
        });
    }

    // テーマ設定ボタンのイベントリスナーを設定
    if (openThemeModalBtn) {
        openThemeModalBtn.addEventListener('click', () => {
            renderThemeSwitcher();
             // index.htmlで定義されているグローバル関数を呼び出す
            if(typeof openModal === 'function') openModal('theme-modal');
        });
    }
    
    // ★ エコアイランドボタンのイベントリスナーは index.html 側で設定済み
    // (openIslandBtn.addEventListener('click', ...))
    // gamification.js 側では、DOM要素の取得のみ行います。
}

// 修正点: DOMContentLoadedイベントをリッスンして初期化処理を実行
document.addEventListener('DOMContentLoaded', initGamification);

