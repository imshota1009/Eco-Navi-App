// --- DOM Elements ---
// これらの要素は、index.html に追加された後に取得されます。
let ecoPointsDisplay;
let openPointStoreBtn;

// --- Constants ---
const STORE_ITEMS = {
    'theme-dark': { name: 'ダークテーマ', price: 0, type: 'color' },
    'theme-sakura': { name: '桜テーマ', price: 350, type: 'color' },
    'bg-spring': { name: '季節の背景: 春', price: 500, type: 'background', image: 'images/spring.png' },
    'bg-summer': { name: '季節の背景: 夏', price: 500, type: 'background', image: 'images/summer.png' },
    'bg-fall': { name: '季節の背景: 秋', price: 500, type: 'background', image: 'images/fall.png' },
    'bg-winter': { name: '季節の背景: 冬', price: 500, type: 'background', image: 'images/winter.png' },
};

// --- localStorage Keys ---
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
    if (ecoPointsDisplay) {
        ecoPointsDisplay.textContent = getEcoPoints();
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
    // 既存のトースト機能を使って通知
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
    // 既存のテーマクラスをすべて削除
    document.body.classList.remove('theme-dark', 'theme-sakura', 'bg-spring', 'bg-summer', 'bg-fall', 'bg-winter');
    document.body.style.backgroundImage = ''; // 背景画像をリセット

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
 * ポイントストアのモーダル内のアイテムリストを描画します。
 */
function renderPointStore() {
    const container = document.getElementById('point-store-items');
    if (!container) return;

    const currentPoints = getEcoPoints();
    const purchasedItems = getPurchasedItems();
    const appliedTheme = localStorage.getItem(LS_KEYS.APPLIED_THEME);

    container.innerHTML = Object.entries(STORE_ITEMS).map(([id, item]) => {
        const isPurchased = purchasedItems.includes(id);
        const canAfford = currentPoints >= item.price;
        const isApplied = appliedTheme === id;

        let buttonHtml;
        if (isApplied) {
            buttonHtml = `<button class="w-full text-sm font-bold py-2 px-4 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed" disabled>適用中</button>`;
        } else if (isPurchased) {
            buttonHtml = `<button class="w-full text-sm font-bold py-2 px-4 rounded-lg bg-green-500 hover:bg-green-600 text-white transition" onclick="applyTheme('${id}'); renderPointStore();">適用する</button>`;
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
    if (purchasedItems.includes(itemId)) return; // すでに購入済み

    // ポイントを減算
    saveEcoPoints(currentPoints - item.price);

    // 購入済みリストに追加
    purchasedItems.push(itemId);
    localStorage.setItem(LS_KEYS.PURCHASED, JSON.stringify(purchasedItems));

    // すぐにテーマを適用
    applyTheme(itemId);

    // ストアの表示を更新
    renderPointStore();
}

/**
 * ゲーミフィケーション機能の初期化
 */
function initGamification() {
    // DOM要素を取得
    ecoPointsDisplay = document.getElementById('eco-points-display-value');
    openPointStoreBtn = document.getElementById('open-point-store-btn');
    
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
            openModal('point-store-modal');
        });
    }
}


// DOMの読み込みが完了したら初期化処理を実行
document.addEventListener('DOMContentLoaded', initGamification);

