/**
 * =================================================================
 * UTILITIES & GLOBAL FUNCTIONS
 * =================================================================
 */
const clickSound = new Audio('sounds/ui-click.mp3');
const hoverSound = new Audio('sounds/ui-hover.mp3');
const playSoundOnClick = () => clickSound.play().catch(e => console.log("Autoplay blocked"));
const playSoundOnHover = () => hoverSound.play().catch(e => console.log("Autoplay blocked"));

/**
 * Inisialisasi event listener global yang ada di setiap halaman.
 */
function initGlobalListeners() {
    // Terapkan suara ke elemen yang dapat diklik
    const clickableElements = document.querySelectorAll(
        'a, button, .btn-main, .btn-secondary, .team-action-btn, .user-actions .fas, .notification, .profile-avatar, .tab-link, .tab-main-link, .topic-nav-link, .star-rating i, .toggle-btn'
    );

    clickableElements.forEach(el => {
        // Terapkan suara klik ke semua elemen yang bisa diklik
        el.addEventListener('click', playSoundOnClick);
        // Terapkan suara hover hanya jika bukan elemen sentuh (untuk performa mobile)
        el.addEventListener('mouseover', playSoundOnHover);
    });
}

/**
 * =================================================================
 * PAGE-SPECIFIC INITIALIZATION FUNCTIONS
 * =================================================================
 */

/**
 * Logika untuk semua halaman yang memiliki sistem navigasi tab.
 * Contoh: team_profile.html, user_profile.html
 */
function initTabNavigation() {
    const profileTabs = document.querySelectorAll('.tab-navigation .tab-link');
    if (profileTabs.length > 0) {
        profileTabs.forEach(link => {
            link.addEventListener('click', function(e) {
                // e.preventDefault(); // Tidak lagi diperlukan karena kita menggunakan <button>

                // Mainkan suara klik saat tab diganti
                playSoundOnClick();
                
                // Dapatkan parent navigation untuk menargetkan tab & content yang benar
                const tabContainer = this.closest('.tab-navigation');
                const mainContainer = tabContainer.parentElement;

                // Hapus kelas 'active' dari semua tab dan konten di dalam container yang sama
                tabContainer.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
                mainContainer.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                // Tambahkan kelas 'active' ke tab yang diklik dan konten yang sesuai
                this.classList.add('active');
                const content = document.getElementById(this.dataset.tab);
                if (content) {
                    content.classList.add('active');
                }
            });
        });
    }
}

/**
 * Logika untuk halaman autentikasi (auth.html).
 */
function initAuthPage() {
    const authLinks = document.querySelectorAll('.tab-auth-link');
    const authForms = document.querySelectorAll('.auth-form');
    if (authLinks.length > 0 && authForms.length > 0) {
        // Fungsi untuk menampilkan form yang benar
        const showAuthForm = (formId) => { 
            authForms.forEach(f => f.classList.remove('active'));
            const targetForm = document.getElementById(formId);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        }; 

        // Atur tampilan awal saat halaman dimuat
        const initialActiveLink = document.querySelector('.tab-auth-link.active');
        if (initialActiveLink) {
            showAuthForm(initialActiveLink.dataset.form);
        }

        // Tambahkan event listener untuk klik
        authLinks.forEach(link => {
            link.addEventListener('click', function() {
                authLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                showAuthForm(this.dataset.form);
            });
        });
    }
}

/**
 * Logika untuk filter di halaman Team Hub (teamhub.html).
 */
function initTeamHubFilters() {
    const applyBtn = document.getElementById('apply-team-filters-btn');
    const searchInput = document.getElementById('search-input');
    const teamCards = document.querySelectorAll('.team-card-search');

    // Jadikan filterTeams sebagai fungsi yang bisa diakses dari luar jika perlu
    window.filterAndReset = () => {
        // 1. Ambil semua nilai filter saat ini
        const searchTerm = searchInput.value.toLowerCase();
        const activeVisionBtn = document.querySelector('.toggle-btn.active');
        const selectedVision = activeVisionBtn ? activeVisionBtn.dataset.vision : 'all';
        const minRating = parseFloat(document.getElementById('rating-input').value);
        const minTh = parseInt(document.getElementById('th-level-input').value);

        // 2. Loop melalui setiap kartu tim
        teamCards.forEach(card => {
            // Ambil data dari atribut data-* kartu
            const teamName = card.dataset.name.toLowerCase();
            const teamTag = card.dataset.tag.toLowerCase();
            const teamVision = card.dataset.vision;
            const teamRating = parseFloat(card.dataset.rating);
            const teamTh = parseFloat(card.dataset.th);

            // 3. Cek setiap kondisi filter
            const nameMatch = teamName.includes(searchTerm) || teamTag.includes(searchTerm);
            const visionMatch = selectedVision === 'all' || teamVision === selectedVision;
            const ratingMatch = teamRating >= minRating;
            const thMatch = teamTh >= minTh;

            // 4. Tampilkan atau sembunyikan kartu
            if (nameMatch && visionMatch && ratingMatch && thMatch) {
                card.style.display = ''; // Hapus style display agar kembali ke default CSS
            } else {
                card.style.display = 'none';
            }
        });

        // 5. Panggil reset untuk "Load More" setelah filter
        const resetLoadMoreFunc = window[`resetLoadMore_team-search-results-container`];
        if (typeof resetLoadMoreFunc === 'function') {
            resetLoadMoreFunc();
        }
    };

    // Tambahkan event listener ke tombol "Terapkan Filter"
    if (applyBtn) {
        applyBtn.addEventListener('click', window.filterAndReset);
    }

    // Rating slider logic
    const ratingInput = document.getElementById('rating-input');
    const ratingValue = document.getElementById('rating-value');
    if (ratingInput && ratingValue) {
        ratingInput.addEventListener('input', () => {
            ratingValue.textContent = parseFloat(ratingInput.value).toFixed(1);
        });
    }

    // TH Level slider logic
    const thLevelInput = document.getElementById('th-level-input');
    const thRangeValue = document.getElementById('th-range-value');
    if (thLevelInput && thRangeValue) {
        thLevelInput.addEventListener('input', () => {
            thRangeValue.textContent = thLevelInput.value; 
        });
    }

    // Toggle button logic
    const toggleBtns = document.querySelectorAll('.toggle-group .toggle-btn');
    if (toggleBtns.length > 0) {
        toggleBtns.forEach(button => {
            button.addEventListener('click', () => {
                // Mainkan suara klik saat toggle
                playSoundOnClick();
                toggleBtns.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    // Reset button logic
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // 1. Reset input teks
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.value = '';

            // 2. Reset toggle buttons ke 'Kompetitif'
            const competitiveBtn = document.querySelector('.toggle-btn[data-vision="competitive"]');
            if (competitiveBtn) {
                document.querySelectorAll('.toggle-group .toggle-btn').forEach(btn => btn.classList.remove('active'));
                competitiveBtn.classList.add('active');
            }
            
            // 3. Reset slider reputasi
            if (ratingInput && ratingValue) {
                const defaultValue = "4.0";
                ratingInput.value = defaultValue;
                ratingValue.textContent = parseFloat(defaultValue).toFixed(1);
            }

            // 4. Reset slider Town Hall
            if (thLevelInput && thRangeValue) {
                const defaultValue = "13";
                thLevelInput.value = defaultValue;
                thRangeValue.textContent = defaultValue;
            }

            // 5. Panggil fungsi filter yang sudah terintegrasi dengan "Load More"
            window.filterAndReset();
        });
    }
}

/**
 * Logika generik untuk tombol "Muat Lebih Banyak" yang telah disempurnakan.
 * Fungsi ini sekarang menangani item yang mungkin disembunyikan oleh filter.
 */
function initLoadMore(containerId, itemSelector, buttonId, itemsPerLoad = 6, increment = 6) {
    const container = document.getElementById(containerId); 
    const button = document.getElementById(buttonId);

    if (!container || !button) return;

    let currentItemLimit = itemsPerLoad;

    const updateVisibility = () => {
        // Hanya pertimbangkan item yang tidak disembunyikan oleh filter
        // Ini adalah kunci: kita hanya bekerja dengan item yang 'seharusnya' terlihat.
        const visibleItems = Array.from(container.querySelectorAll(itemSelector))
                                  .filter(item => item.style.display !== 'none');
        
        let currentlyVisibleCount = 0;

        // Loop melalui item yang sudah difilter
        visibleItems.forEach((item, index) => {
            if (index < currentItemLimit) {
                // Tampilkan item jika berada dalam batas.
                // Tidak perlu mengubah display di sini karena filter sudah menanganinya.
                // Cukup hitung saja.
                currentlyVisibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Tampilkan atau sembunyikan tombol "Muat Lebih Banyak"
        if (visibleItems.length > currentItemLimit) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    };

    button.addEventListener('click', () => {
        currentItemLimit += increment; // Tambah jumlah item yang akan ditampilkan
        updateVisibility(); // Perbarui tampilan item
    });

    // Jadikan fungsi ini dapat diakses secara global untuk dipanggil oleh filter
    window[`resetLoadMore_${containerId}`] = () => {
        currentItemLimit = itemsPerLoad; // Reset batas ke jumlah awal
        updateVisibility();
    };
}

/**
 * Logika untuk input rating bintang di halaman formulir ulasan.
 */
function initStarRating() {
    const starRatingDivs = document.querySelectorAll('.star-rating');
    if (starRatingDivs.length > 0) {
        starRatingDivs.forEach(ratingDiv => {
            const stars = ratingDiv.querySelectorAll('i');
            const hiddenInput = ratingDiv.nextElementSibling;

            // Fungsi untuk memperbarui visual bintang
            const updateStars = (rating) => {
                stars.forEach((star, i) => {
                    if (i < rating) {
                        star.classList.add('rated');
                    } else {
                        star.classList.remove('rated');
                    }
                });
            };

            stars.forEach((star, index) => {
                star.addEventListener('click', () => {
                    const newRating = index + 1;
                    // Mainkan suara klik
                    playSoundOnClick();
                    // Perbarui atribut data
                    ratingDiv.setAttribute('data-rating', newRating);
                    // Perbarui visual
                    updateStars(newRating);
                    // Perbarui nilai input tersembunyi
                    if (hiddenInput && hiddenInput.type === 'hidden') {
                        hiddenInput.value = newRating;
                    }
                });

                star.addEventListener('mouseover', () => {
                    // Efek hover visual
                    updateStars(index + 1);
                });
            });

            ratingDiv.addEventListener('mouseout', () => {
                // Kembalikan ke rating yang tersimpan saat mouse keluar
                const currentRating = parseInt(ratingDiv.getAttribute('data-rating')) || 0;
                updateStars(currentRating);
            });
        });
    }
}

/**
 * Logika untuk halaman ulasan (team_reviews.html), termasuk filter histogram.
 */
function initReviewPageFilters() {
    // Cek keberadaan elemen unik untuk halaman ini, yaitu kontainer ulasan.
    const reviewListContainer = document.getElementById('review-list-container');
    if (!reviewListContainer) return;

    // Dapatkan elemen-elemen lain setelah memastikan kita di halaman yang benar.
    const filterGroup = document.getElementById('review-filter-group'); // Untuk team_reviews
    const playerFilterGroup = document.getElementById('player-review-filter-group'); // Untuk player_reviews
    const activeFilterGroup = filterGroup || playerFilterGroup;

    // Jika tidak ada grup filter sama sekali, hentikan fungsi.
    if (!activeFilterGroup) return;

    const histogramBars = activeFilterGroup.querySelectorAll('.histogram-bar');
    const barFills = activeFilterGroup.querySelectorAll('.histogram-bar .bar-fill');
    const reviewCards = document.querySelectorAll('.review-list-area .review-card');
    const reviewCountEl = document.getElementById('review-count');
    const totalReviews = reviewCards.length;
    
    // Cari tombol reset dengan ID dulu, jika tidak ada, cari berdasarkan kelas. Ini lebih andal.
    const resetBtn = document.getElementById('reset-review-filter-btn') || activeFilterGroup.querySelector('.btn-secondary');

    // 1. Animasikan bar saat halaman dimuat
    if (barFills.length > 0) {
        // Gunakan setTimeout untuk memastikan transisi CSS dapat berjalan setelah render awal
        setTimeout(() => {
            barFills.forEach(bar => {
                const targetWidth = bar.dataset.width;
                bar.style.width = targetWidth;
            });
        }, 100); // Delay singkat (100ms) sudah cukup
    }

    // Fungsi untuk memperbarui jumlah ulasan yang ditampilkan
    const updateReviewCount = () => {
        if (!reviewCountEl) return;

        const visibleCards = Array.from(reviewCards).filter(card => card.style.display !== 'none');
        const visibleCount = visibleCards.length;

        // Panggil fungsi load more untuk memperbarui tampilan tombol "Muat Lebih Banyak"
        const resetLoadMoreFunc = window[`resetLoadMore_review-list-container`];
        if (typeof resetLoadMoreFunc === 'function') resetLoadMoreFunc();
        reviewCountEl.textContent = `Menampilkan ${Math.min(visibleCount, 3)} dari ${visibleCount} Ulasan`;
    };

    // 2. Tambahkan event listener untuk filter
    if (histogramBars.length > 0 && reviewCards.length > 0) {
        histogramBars.forEach(bar => {
            bar.addEventListener('click', function() {
                const selectedRating = this.dataset.rating;

                // Atur kelas 'active'
                histogramBars.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Filter kartu ulasan
                reviewCards.forEach(card => {
                    if (card.dataset.rating === selectedRating) {
                        card.style.display = ''; // Gunakan display default dari CSS
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Perbarui hitungan setelah filter
                updateReviewCount();
            });
        });
    }

    // 3. Tambahkan event listener untuk tombol reset
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah perilaku default jika tombol adalah <a>
            histogramBars.forEach(b => b.classList.remove('active'));
            reviewCards.forEach(card => card.style.display = ''); // Gunakan display default dari CSS
            // Perbarui hitungan setelah reset
            updateReviewCount();
        });
    }
}

/**
 * Logika untuk filter di halaman turnamen (tournament.html).
 */
function initTournamentFilters() {
    const statusFilter = document.getElementById('status-filter');
    const thFilter = document.getElementById('th-level-filter');
    const prizeFilter = document.getElementById('prize-filter');
    const tournamentCards = document.querySelectorAll('.tournament-card');
    const tournamentCountEl = document.getElementById('tournament-count');

    // Pastikan semua elemen filter ada sebelum melanjutkan
    if (statusFilter && thFilter && prizeFilter && tournamentCards.length > 0) {
        const filterTournaments = () => {
            // Mainkan suara klik saat filter diterapkan
            playSoundOnClick();
            
            const selectedStatus = statusFilter.value;
            const selectedTh = thFilter.value;
            const selectedPrize = prizeFilter.value;
            let visibleCount = 0;

            tournamentCards.forEach(card => {
                const cardStatus = card.dataset.status;
                const cardTh = card.dataset.th;
                const cardPrize = card.dataset.prize;

                // Cek setiap kondisi filter
                const statusMatch = selectedStatus === 'Akan Datang' || selectedStatus === cardStatus;
                
                // Logika TH yang diperbaiki: "Semua Level" atau jika nilai filter ada di dalam data-th kartu.
                const thMatch = selectedTh === 'Semua Level' || (cardTh && cardTh.includes(selectedTh.split(' ')[1]));

                const prizeMatch = selectedPrize === 'all' || selectedPrize === cardPrize;

                // Tampilkan kartu jika semua kondisi terpenuhi
                if (statusMatch && thMatch && prizeMatch) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Perbarui jumlah event yang ditampilkan
            if (tournamentCountEl) {
                const baseText = "Turnamen Aktif & Akan Datang";
                tournamentCountEl.textContent = `${baseText} (${visibleCount} Event)`;
            }

            // Panggil reset "Load More" jika ada
            const resetLoadMoreFunc = window[`resetLoadMore_tournament-list-container`]; // Ganti dengan ID kontainer turnamen jika ada
            if (typeof resetLoadMoreFunc === 'function') {
                resetLoadMoreFunc();
            }
        };

        // Tambahkan event listener ke setiap dropdown filter
        statusFilter.addEventListener('change', filterTournaments);
        thFilter.addEventListener('change', filterTournaments);
        prizeFilter.addEventListener('change', filterTournaments);
    }
}

/**
 * Logika untuk search overlay global.
 */
function initSearchOverlay() {
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.getElementById('close-search-btn');

    if (searchIcon && searchOverlay && closeSearchBtn) {
        const showOverlay = () => {
            searchOverlay.classList.add('visible');
            // Fokuskan ke input field saat overlay muncul
            searchOverlay.querySelector('input[type="text"]').focus();
        };

        const hideOverlay = () => {
            searchOverlay.classList.remove('visible');
        };

        searchIcon.addEventListener('click', showOverlay);
        closeSearchBtn.addEventListener('click', hideOverlay);

        // Sembunyikan overlay saat menekan tombol 'Escape'
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('visible')) {
                hideOverlay();
            }
        });
    }
}

/**
 * Logika untuk filter di halaman notifikasi (notifications.html).
 */
function initNotificationFilters() {
    const notificationFilters = document.querySelectorAll('.notification-filter-sidebar .filter-btn');
    const notificationCards = document.querySelectorAll('.notification-list-area .notification-card');

    if (notificationFilters.length > 0 && notificationCards.length > 0) {
        notificationFilters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                // Mainkan suara klik saat filter diganti
                playSoundOnClick();

                // Atur status aktif pada link filter
                notificationFilters.forEach(f => f.classList.remove('active'));
                this.classList.add('active');

                const selectedFilter = this.dataset.filter;

                // Tampilkan atau sembunyikan kartu notifikasi
                notificationCards.forEach(card => {
                    if (selectedFilter === 'all' || card.dataset.category === selectedFilter) { 
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Logika untuk filter di halaman Knowledge Hub (knowledge_hub.html).
 */
function initKnowledgeHubFilters() {
    const feedContainer = document.getElementById('forum-feed-container');
    const categoryFilters = document.querySelectorAll('.category-filters .topic-nav-link');
    const sortFilters = document.querySelectorAll('.sort-filters .sort-link');
    const postCards = Array.from(feedContainer.querySelectorAll('.post-card-link'));
    const loadMoreBtn = document.getElementById('load-more-posts-btn');

    // Pastikan semua elemen penting ada sebelum melanjutkan
    if (!feedContainer || categoryFilters.length === 0 || sortFilters.length === 0 || postCards.length === 0 || !loadMoreBtn) return;

    // Simpan urutan asli (Terbaru)
    postCards.forEach((card, index) => {
        card.dataset.originalOrder = index;
    });

    // Fungsi terpusat untuk mengurutkan, memfilter, dan memperbarui tampilan
    const processFilters = () => {
        const activeCategoryFilter = document.querySelector('.category-filters .topic-nav-link.active');
        const activeSort = document.querySelector('.sort-link.active').dataset.sort;
        if (!activeCategoryFilter) return;

        const selectedCategory = activeCategoryFilter.dataset.filter;

        // 1. Urutkan array kartu berdasarkan kriteria sort
        let sortedCards = [...postCards]; // Buat salinan untuk diurutkan
        if (activeSort === 'trending') {
            sortedCards.sort((a, b) => {
                const scoreA = parseInt(a.dataset.replies || 0) + parseInt(a.dataset.likes || 0);
                const scoreB = parseInt(b.dataset.replies || 0) + parseInt(b.dataset.likes || 0);
                return scoreB - scoreA; // Urutkan dari skor tertinggi ke terendah
            });
        } else { // 'terbaru' atau default
            sortedCards.sort((a, b) => {
                return a.dataset.originalOrder - b.dataset.originalOrder;
            });
        }

        // 2. Terapkan urutan baru ke DOM
        // Ini adalah kunci: kita hanya mengatur ulang urutan, bukan menghapus dan menambah ulang semua.
        sortedCards.forEach(card => feedContainer.appendChild(card));

        // BARU: Pindahkan tombol "Muat Lebih Banyak" ke paling akhir setelah kartu diurutkan.
        // Ini memastikan tombol selalu berada di bawah daftar postingan.
        feedContainer.appendChild(loadMoreBtn);

        // 3. Terapkan filter visibilitas
        // Loop melalui array yang sudah diurutkan
        sortedCards.forEach(card => {
            const isVisible = selectedCategory === 'all' || card.dataset.category === selectedCategory;
            // Set display ke '' jika cocok, 'none' jika tidak.
            // Fungsi loadMore akan menangani penyembunyian item yang melebihi batas.
            card.style.display = isVisible ? '' : 'none';
        });

        // 4. Panggil reset "Load More" setelah filter dan pengurutan selesai.
        const resetLoadMoreFunc = window[`resetLoadMore_forum-feed-container`];
        if (typeof resetLoadMoreFunc === 'function') {
            resetLoadMoreFunc();
        }
    };

    // Event listener untuk tombol Urutkan
    sortFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            playSoundOnClick();
            sortFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            processFilters(); // Panggil fungsi terpusat
        });
    });

    // Terapkan event listener ke filter kategori
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            playSoundOnClick();
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            processFilters(); // Panggil fungsi terpusat
        });
    });

    // Panggil sekali saat halaman dimuat untuk menerapkan filter awal dan "load more".
    processFilters();
}

/**
 * Logika untuk menyimpan dan memuat data profil pengguna via localStorage.
 * Ini akan menangani penyimpanan data dari `edit_profile.html` dan menampilkannya di `user_profile.html`.
 */
function initUserProfilePersistence() {
    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form submit secara default

            // Ambil semua nilai dari form
            const userProfileData = {
                username: document.getElementById('username').value,
                bio: document.getElementById('user-bio-textarea').value,
                role: document.getElementById('fav-role').value,
                hours: document.getElementById('active-hours').value,
                thLevel: document.getElementById('th-level').value,
                discord: document.getElementById('discord-id').value,
                website: document.getElementById('website').value,
            };

            // Simpan sebagai string JSON di localStorage
            localStorage.setItem('clashHubUserProfile', JSON.stringify(userProfileData));

            // Beri notifikasi dan arahkan ke halaman profil
            alert('Profil berhasil diperbarui!');
            window.location.href = 'user_profile.html';
        });
    }

    // Fungsi untuk memuat data ke dalam form edit_profile.html
    const loadProfileDataForEditing = () => {
        const savedData = localStorage.getItem('clashHubUserProfile');
        if (savedData) {
            const userProfile = JSON.parse(savedData);

            // Fungsi untuk mengisi nilai input jika elemen ada
            const setInputValue = (id, value) => {
                const element = document.getElementById(id);
                if (element) {
                    element.value = value;
                }
            };

            // Isi semua field di form edit
            setInputValue('username', userProfile.username);
            setInputValue('user-bio-textarea', userProfile.bio);
            setInputValue('fav-role', userProfile.role);
            setInputValue('active-hours', userProfile.hours);
            setInputValue('th-level', userProfile.thLevel);
            setInputValue('discord-id', userProfile.discord);
            setInputValue('website', userProfile.website);
        }
    };

    // Fungsi untuk memuat data di halaman user_profile.html
    const loadProfileDataForDisplay = () => {
        const savedData = localStorage.getItem('clashHubUserProfile');

        if (savedData) {
            const userProfile = JSON.parse(savedData);

            // Fungsi untuk update elemen jika ada
            const updateElement = (id, value) => {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = value;
                }
            };

            // Update semua elemen di halaman profil
            updateElement('profile-username', userProfile.username);
            updateElement('profile-bio', userProfile.bio);
            updateElement('profile-role', userProfile.role);
            updateElement('profile-hours', userProfile.hours);
            updateElement('profile-th-level', userProfile.thLevel);
            updateElement('profile-discord', userProfile.discord);
            updateElement('profile-website', userProfile.website);

            // Logika untuk memperbarui gambar Town Hall
            const thImageElement = document.getElementById('profile-th-image');
            if (thImageElement && userProfile.thLevel) {
                // Ekstrak nomor dari string "TH 16" -> "16"
                const thNumber = userProfile.thLevel.split(' ')[1];
                if (thNumber) {
                    // Buat path gambar yang benar, contoh: "images/th16.png"
                    thImageElement.src = `images/th${thNumber}.png`;
                    thImageElement.alt = userProfile.thLevel;
                }
            }
        }
    };

    // Tentukan halaman mana yang sedang aktif dan jalankan fungsi yang sesuai
    const pathname = window.location.pathname;
    if (pathname.includes('user_profile.html') || pathname.includes('player_public_profile.html')) {
        loadProfileDataForDisplay();
    } else if (pathname.includes('edit_profile.html')) {
        loadProfileDataForEditing();
    }
}

/**
 * Logika untuk efek parallax pada kartu showcase TH di user_profile.html
 */
function initTHShowcaseParallax() {
    const card = document.getElementById('th-showcase-card');
    if (!card) return;

    const bg = card.querySelector('.th-showcase-bg');
    const fg = card.querySelector('.th-showcase-fg');
    const info = card.querySelector('.th-showcase-info');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20; // Mengatur intensitas rotasi
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        bg.style.transform = `translateX(${(centerX - x) / 25}px) translateY(${(centerY - y) / 25}px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        bg.style.transform = 'translateX(0) translateY(0)';
    });
}

/**
 * Menerapkan tema (light/dark) yang tersimpan di localStorage saat halaman dimuat.
 * Fungsi ini berjalan di setiap halaman, terlepas dari ada atau tidaknya tombol toggle.
 */
function applySavedThemeOnLoad() {
    const currentTheme = localStorage.getItem('theme');
    // Default ke 'dark' jika tidak ada tema yang tersimpan
    const theme = currentTheme || 'dark'; 
    document.body.classList.toggle('light-mode', theme === 'light');
    updateThemeIcon(theme);
}

/**
 * Memperbarui ikon tombol tema berdasarkan tema saat ini.
 * @param {string} theme - Tema saat ini ('light' atau 'dark').
 */
function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    icon.className = (theme === 'light') ? 'fas fa-moon' : 'fas fa-sun';
}

/**
 * Logika untuk tombol pengalih tema (light/dark mode).
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (!themeToggleBtn) return;
 
    // Tambahkan event listener untuk tombol
    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        const newTheme = isLight ? 'light' : 'dark';
        
        updateThemeIcon(newTheme);
        // Simpan preferensi baru ke localStorage
        localStorage.setItem('theme', newTheme);
        // Mainkan suara klik
        playSoundOnClick();
    });
}

/**
 * =================================================================
 * MAIN APP INITIALIZATION
 * =================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    applySavedThemeOnLoad(); // SELALU terapkan tema yang tersimpan terlebih dahulu

    // Jalankan fungsi global di setiap halaman
    initGlobalListeners();
    initSearchOverlay();

    // Inisialisasi "Load More" untuk halaman yang membutuhkannya.
    // Ini harus dijalankan SEBELUM filter agar fungsi reset-nya tersedia.
    initLoadMore('review-list-container', '.review-card', 'load-more-reviews-btn', 3, 3); // Halaman ulasan
    initLoadMore('team-search-results-container', '.team-card-search', 'load-more-teams-btn', 6, 6); // Halaman pencarian tim
    initLoadMore('forum-feed-container', '.post-card-link', 'load-more-posts-btn', 3, 3); // Halaman Knowledge Hub
    initThemeToggle(); // Inisialisasi event listener untuk tombol tema (jika ada)

    // Jalankan fungsi spesifik halaman berdasarkan keberadaan elemen unik
    if (document.querySelector('.tab-navigation')) initTabNavigation();
    if (document.querySelector('.auth-container')) initAuthPage(); 
    if (document.getElementById('rating-input')) initTeamHubFilters(); // Gunakan ID unik dari teamhub.html
    if (document.querySelector('.star-rating')) initStarRating();
    if (document.getElementById('review-list-container')) initReviewPageFilters(); // Gunakan ID kontainer ulasan sebagai pemicu
    if (document.getElementById('status-filter')) initTournamentFilters();
    if (document.querySelector('.notification-filter-sidebar')) initNotificationFilters(); 
    if (document.querySelector('.category-filters')) initKnowledgeHubFilters();
    if (document.getElementById('th-showcase-card')) initTHShowcaseParallax();
    
    // Logika profil bisa digabung karena saling terkait
    if (document.getElementById('edit-profile-form') || window.location.pathname.includes('user_profile.html') || window.location.pathname.includes('player_public_profile.html')) {
        initUserProfilePersistence();
    }

    // Panggil filter tim saat halaman dimuat untuk menyembunyikan item yang tidak cocok & mengatur "Load More"
    if (window.filterAndReset) window.filterAndReset();
});