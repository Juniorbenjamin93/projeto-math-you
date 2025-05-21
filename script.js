document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    const likeButton = document.querySelector('.btn-like');
    const dislikeButton = document.querySelector('.btn-dislike');
    // Profile functionality
    const profileButton = document.querySelector('.fa-user');
    profileButton.addEventListener('click', showProfileEditor);

    function showProfileEditor() {
        const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        
        const profilePopup = document.createElement('div');
        profilePopup.classList.add('profile-popup');
        profilePopup.innerHTML = `
            <div class="profile-edit-content">
                <h2>Editar Perfil</h2>
                <form id="profile-form" class="profile-form">
                    <div class="profile-photo-section">
                        <img src="${currentProfile.photo || 'jb.jpg'}" alt="Foto de Perfil" id="profile-photo">
                        <input type="file" id="photo-upload" accept="image/*" hidden>
                        <button type="button" class="photo-upload-btn">
                            <i class="fas fa-camera"></i> Alterar Foto
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label>Nome Completo</label>
                        <input type="text" name="name" value="${currentProfile.name || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Idade</label>
                        <input type="number" name="age" value="${currentProfile.age || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Cidade onde Nasceu</label>
                        <input type="text" name="birthplace" value="${currentProfile.birthplace || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Cidade Atual</label>
                        <input type="text" name="currentCity" value="${currentProfile.currentCity || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Profissão</label>
                        <input type="text" name="profession" value="${currentProfile.profession || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Local de Trabalho</label>
                        <input type="text" name="workplace" value="${currentProfile.workplace || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Instagram</label>
                        <input type="text" name="instagram" value="${currentProfile.instagram || ''}" placeholder="@seu_instagram">
                    </div>
                    
                    <div class="form-group">
                        <label>WhatsApp</label>
                        <input type="tel" name="whatsapp" value="${currentProfile.whatsapp || ''}" placeholder="+55 (XX) XXXXX-XXXX">
                    </div>
                    
                    <div class="form-group">
                        <label>Bio</label>
                        <textarea name="bio" rows="3">${currentProfile.bio || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Interesses</label>
                        <input type="text" name="interests" value="${currentProfile.interests?.join(', ') || ''}" placeholder="Separe por vírgulas">
                    </div>

                    <div class="section-title">
                        <i class="fas fa-images"></i> Galeria de Fotos
                    </div>
                    <div class="gallery-upload-section">
                        <div class="gallery-preview" id="gallery-preview">
                            ${(currentProfile.gallery || []).map(img => `
                                <div class="gallery-item">
                                    <img src="${img}" alt="Galeria">
                                    <button type="button" class="remove-image">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `).join('') || '<p>Adicione até 10 fotos</p>'}
                        </div>
                        <input type="file" id="gallery-upload" accept="image/*" multiple hidden>
                        <button type="button" class="gallery-upload-btn">
                            <i class="fas fa-plus"></i> Adicionar Fotos
                        </button>
                    </div>

                    <div class="section-title">
                        <i class="fas fa-music"></i> Músicas Favoritas
                    </div>
                    <div class="music-section">
                        <div class="music-list" id="music-list">
                            ${(currentProfile.music || []).map(song => `
                                <div class="music-item">
                                    <i class="fas fa-music"></i>
                                    <span>${song.title} - ${song.artist}</span>
                                    <button type="button" class="remove-music">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `).join('') || '<p>Adicione suas músicas favoritas</p>'}
                        </div>
                        <div class="add-music-form">
                            <input type="text" id="music-title" placeholder="Nome da música">
                            <input type="text" id="music-artist" placeholder="Artista">
                            <button type="button" class="add-music-btn">
                                <i class="fas fa-plus"></i> Adicionar Música
                            </button>
                        </div>
                    </div>

                    <div class="section-title">
                        <i class="fas fa-utensils"></i> Preferências Gastronômicas
                    </div>
                    <div class="gastronomy-section">
                        <div class="favorite-places">
                            <h4>Lugares Favoritos</h4>
                            <div class="places-list" id="places-list">
                                ${(currentProfile.favoritePlaces || []).map(place => `
                                    <div class="place-item">
                                        <img src="${place.image || 'placeholder.jpg'}" alt="${place.name}">
                                        <div class="place-info">
                                            <h5>${place.name}</h5>
                                            <p><i class="fas fa-map-marker-alt"></i> ${place.location}</p>
                                        </div>
                                        <button type="button" class="remove-place">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `).join('') || '<p>Adicione seus restaurantes favoritos</p>'}
                            </div>
                            <div class="add-place-form">
                                <input type="text" id="place-name" placeholder="Nome do restaurante">
                                <input type="text" id="place-location" placeholder="Localização">
                                <input type="file" id="place-image" accept="image/*" hidden>
                                <button type="button" class="add-place-photo">
                                    <i class="fas fa-camera"></i> Adicionar Foto
                                </button>
                                <button type="button" class="add-place-btn">
                                    <i class="fas fa-plus"></i> Adicionar Local
                                </button>
                            </div>
                        </div>
                        
                        <div class="dream-places">
                            <h4>Lugares que Deseja Conhecer</h4>
                            <div class="dream-places-list" id="dream-places-list">
                                ${(currentProfile.dreamPlaces || []).map(place => `
                                    <div class="place-item">
                                        <img src="${place.image || 'placeholder.jpg'}" alt="${place.name}">
                                        <div class="place-info">
                                            <h5>${place.name}</h5>
                                            <p><i class="fas fa-map-marker-alt"></i> ${place.location}</p>
                                        </div>
                                        <button type="button" class="remove-place">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `).join('') || '<p>Adicione lugares que gostaria de conhecer</p>'}
                            </div>
                            <div class="add-dream-place-form">
                                <input type="text" id="dream-place-name" placeholder="Nome do lugar">
                                <input type="text" id="dream-place-location" placeholder="Localização">
                                <input type="file" id="dream-place-image" accept="image/*" hidden>
                                <button type="button" class="add-dream-place-photo">
                                    <i class="fas fa-camera"></i> Adicionar Foto
                                </button>
                                <button type="button" class="add-dream-place-btn">
                                    <i class="fas fa-plus"></i> Adicionar Local
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="profile-actions">
                        <button type="submit" class="save-profile">Salvar</button>
                        <button type="button" class="cancel-profile">Cancelar</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(profilePopup);
        
        setTimeout(() => {
            profilePopup.classList.add('show');
        }, 100);

        // Photo upload handling
        const photoUpload = profilePopup.querySelector('#photo-upload');
        const photoUploadBtn = profilePopup.querySelector('.photo-upload-btn');
        const profilePhoto = profilePopup.querySelector('#profile-photo');

        photoUploadBtn.addEventListener('click', () => photoUpload.click());
        
        photoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePhoto.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Gallery functionality
        const galleryUpload = profilePopup.querySelector('#gallery-upload');
        const galleryUploadBtn = profilePopup.querySelector('.gallery-upload-btn');
        const galleryPreview = profilePopup.querySelector('#gallery-preview');

        galleryUploadBtn.addEventListener('click', () => galleryUpload.click());

        galleryUpload.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            const currentGallery = Array.from(galleryPreview.querySelectorAll('img')).map(img => img.src);
            
            if (currentGallery.length + files.length > 10) {
                alert('Máximo de 10 fotos permitido');
                return;
            }

            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.innerHTML = `
                        <img src="${e.target.result}" alt="Galeria">
                        <button type="button" class="remove-image">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    galleryPreview.appendChild(galleryItem);

                    galleryItem.querySelector('.remove-image').addEventListener('click', () => {
                        galleryItem.remove();
                    });
                };
                reader.readAsDataURL(file);
            });
        });

        // Music functionality
        const addMusicBtn = profilePopup.querySelector('.add-music-btn');
        const musicList = profilePopup.querySelector('#music-list');
        const musicTitle = profilePopup.querySelector('#music-title');
        const musicArtist = profilePopup.querySelector('#music-artist');

        addMusicBtn.addEventListener('click', () => {
            if (!musicTitle.value || !musicArtist.value) return;

            const musicItem = document.createElement('div');
            musicItem.className = 'music-item';
            musicItem.innerHTML = `
                <i class="fas fa-music"></i>
                <span>${musicTitle.value} - ${musicArtist.value}</span>
                <button type="button" class="remove-music">
                    <i class="fas fa-times"></i>
                </button>
            `;
            musicList.appendChild(musicItem);

            musicItem.querySelector('.remove-music').addEventListener('click', () => {
                musicItem.remove();
            });

            musicTitle.value = '';
            musicArtist.value = '';
        });

        // Places functionality
        function setupPlaceForm(addBtn, nameInput, locationInput, imageInput, photoBtn, listContainer) {
            photoBtn.addEventListener('click', () => imageInput.click());
            
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    photoBtn.innerHTML = `<i class="fas fa-check"></i> Foto selecionada`;
                }
            });

            addBtn.addEventListener('click', () => {
                if (!nameInput.value || !locationInput.value) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    const placeItem = document.createElement('div');
                    placeItem.className = 'place-item';
                    placeItem.innerHTML = `
                        <img src="${e.target.result || 'placeholder.jpg'}" alt="${nameInput.value}">
                        <div class="place-info">
                            <h5>${nameInput.value}</h5>
                            <p><i class="fas fa-map-marker-alt"></i> ${locationInput.value}</p>
                        </div>
                        <button type="button" class="remove-place">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    listContainer.appendChild(placeItem);

                    placeItem.querySelector('.remove-place').addEventListener('click', () => {
                        placeItem.remove();
                    });

                    nameInput.value = '';
                    locationInput.value = '';
                    photoBtn.innerHTML = `<i class="fas fa-camera"></i> Adicionar Foto`;
                };

                if (imageInput.files[0]) {
                    reader.readAsDataURL(imageInput.files[0]);
                } else {
                    reader.onload({ target: { result: 'placeholder.jpg' } });
                }
            });
        }

        setupPlaceForm(
            profilePopup.querySelector('.add-place-btn'),
            profilePopup.querySelector('#place-name'),
            profilePopup.querySelector('#place-location'),
            profilePopup.querySelector('#place-image'),
            profilePopup.querySelector('.add-place-photo'),
            profilePopup.querySelector('#places-list')
        );

        setupPlaceForm(
            profilePopup.querySelector('.add-dream-place-btn'),
            profilePopup.querySelector('#dream-place-name'),
            profilePopup.querySelector('#dream-place-location'),
            profilePopup.querySelector('#dream-place-image'),
            profilePopup.querySelector('.add-dream-place-photo'),
            profilePopup.querySelector('#dream-places-list')
        );

        // Form submission
        const form = profilePopup.querySelector('#profile-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const profileData = {
                photo: profilePhoto.src,
                name: formData.get('name'),
                age: formData.get('age'),
                birthplace: formData.get('birthplace'),
                currentCity: formData.get('currentCity'),
                profession: formData.get('profession'),
                workplace: formData.get('workplace'),
                instagram: formData.get('instagram'),
                whatsapp: formData.get('whatsapp'),
                bio: formData.get('bio'),
                interests: formData.get('interests').split(',').map(i => i.trim()).filter(i => i),
                gallery: Array.from(galleryPreview.querySelectorAll('img')).map(img => img.src),
                music: Array.from(musicList.querySelectorAll('.music-item')).map(item => {
                    const [title, artist] = item.querySelector('span').textContent.split(' - ');
                    return { title, artist };
                }),
                favoritePlaces: Array.from(profilePopup.querySelectorAll('#places-list .place-item')).map(item => ({
                    name: item.querySelector('h5').textContent,
                    location: item.querySelector('p').textContent.replace('📍 ', ''),
                    image: item.querySelector('img').src
                })),
                dreamPlaces: Array.from(profilePopup.querySelectorAll('#dream-places-list .place-item')).map(item => ({
                    name: item.querySelector('h5').textContent,
                    location: item.querySelector('p').textContent.replace('📍 ', ''),
                    image: item.querySelector('img').src
                }))
            };
            
            localStorage.setItem('userProfile', JSON.stringify(profileData));
            profilePopup.classList.remove('show');
            setTimeout(() => profilePopup.remove(), 300);
        });

        // Close popup
        profilePopup.querySelector('.cancel-profile').addEventListener('click', () => {
            profilePopup.classList.remove('show');
            setTimeout(() => profilePopup.remove(), 300);
        });
    }

    let touchStartX = 0;
    let touchStartY = 0;

    // Profile data simulation (later this would come from a backend)
    const profiles = [
        {
            name: 'Maria',
            age: 25,
            location: 'São Paulo, BR',
            image: 'https://via.placeholder.com/400x500',
            video: 'https://example.com/video1.mp4',
            interests: ['Viagens', 'Fotografia', 'Música'],
            bio: 'Destinos dos sonhos: Paris, Tokyo, Nova York',
            places: 'Lugares favoritos: Parque Ibirapuera, MASP, Villa Country',
            coordinates: { lat: -23.550520, lng: -46.633308 },
            gender: 'mulher',
            ethnicity: 'branco',
            hairColor: 'loiro',
            eyeColor: 'azul',
            characteristics: ['alto', 'atlético']
        },
        {
            name: 'João',
            age: 28,
            location: 'Rio de Janeiro, BR',
            image: 'https://via.placeholder.com/400x500',
            interests: ['Praia', 'Esportes', 'Gastronomia'],
            bio: 'Destinos dos sonhos: Maldivas, Grécia, Barcelona',
            places: 'Lugares favoritos: Copacabana, Pão de Açúcar, Lapa'
        }
    ];

    let currentProfileIndex = 0;

    // Handle like button click
    likeButton.addEventListener('click', () => {
        handleLike();
    });

    // Handle dislike button click
    dislikeButton.addEventListener('click', () => {
        handleDislike();
    });

    // Touch events for swiping
    profileCard.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    profileCard.addEventListener('touchmove', (e) => {
        if (!touchStartX || !touchStartY) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Only move horizontally if the horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
            profileCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
            profileCard.style.transition = 'none';

            // Add visual feedback
            if (deltaX > 0) {
                profileCard.classList.add('swiping-right');
                profileCard.classList.remove('swiping-left');
            } else {
                profileCard.classList.add('swiping-left');
                profileCard.classList.remove('swiping-right');
            }
        }
    });

    profileCard.addEventListener('touchend', (e) => {
        if (!touchStartX) return;

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        profileCard.style.transition = 'transform 0.3s ease';

        if (Math.abs(deltaX) > 100) {
            if (deltaX > 0) {
                handleLike();
            } else {
                handleDislike();
            }
        } else {
            resetCardPosition();
        }

        // Reset
        touchStartX = 0;
        touchStartY = 0;
        profileCard.classList.remove('swiping-right', 'swiping-left');
    });

    // Add dynamic floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart floating-heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.opacity = Math.random() * 0.15;
        document.querySelector('.floating-hearts').appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create new floating hearts periodically
    setInterval(createFloatingHeart, 3000);

    // Add romantic hover effect to profile images
    document.querySelectorAll('.profile-image img').forEach(img => {
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.02)';
        });
        img.addEventListener('mouseout', () => {
            img.style.transform = 'scale(1)';
        });
    });

    // Enhanced match animation
    function showMatch(profile) {
        const matchPopup = document.createElement('div');
        matchPopup.classList.add('match-popup');
        matchPopup.innerHTML = `
            <div class="match-content">
                <div class="match-hearts">
                    ${Array(5).fill(0).map(() => '<i class="fas fa-heart" style="color: #ff4d6d;"></i>').join('')}
                </div>
                <h2>✨ É um Match! ✨</h2>
                <p>Você e ${profile.name} se conectaram!</p>
                <p class="match-message">Que tal um café? 🌟</p>
                <button class="match-close">Continuar</button>
            </div>
        `;
        document.body.appendChild(matchPopup);

        // Add falling hearts animation
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('i');
            heart.className = 'fas fa-heart falling-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            matchPopup.appendChild(heart);
        }

        setTimeout(() => {
            matchPopup.classList.add('show');
        }, 100);

        matchPopup.querySelector('.match-close').addEventListener('click', () => {
            matchPopup.classList.remove('show');
            setTimeout(() => {
                matchPopup.remove();
            }, 300);
        });
    }

    // Store matches in localStorage
    const savedMatches = JSON.parse(localStorage.getItem('matches') || '[]');
    let matches = savedMatches;

    // Add home button functionality
    const homeButton = document.querySelector('.fa-home');
    homeButton.addEventListener('click', () => {
        // Reset to first profile
        currentProfileIndex = 0;
        loadNextProfile();
        // Hide search panel if open
        const searchPanel = document.querySelector('.search-panel');
        searchPanel.classList.remove('active');
    });

    // Add matches button functionality
    const matchesButton = document.querySelector('.fa-heart');
    matchesButton.addEventListener('click', showMatchesList);

    function showMatchesList() {
        const matchesPopup = document.createElement('div');
        matchesPopup.classList.add('matches-popup');
        
        const matchesList = matches.map(match => `
            <div class="match-item">
                <img src="${match.image}" alt="${match.name}">
                <div class="match-info">
                    <h3>${match.name}, ${match.age}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${match.location}</p>
                    <p class="match-date">${match.matchDate}</p>
                </div>
            </div>
        `).join('') || '<p class="no-matches">Nenhum match ainda!</p>';

        matchesPopup.innerHTML = `
            <div class="matches-content">
                <h2>✨ Seus Matches ✨</h2>
                <div class="matches-list">
                    ${matchesList}
                </div>
                <button class="matches-close">Fechar</button>
            </div>
        `;

        document.body.appendChild(matchesPopup);
        
        setTimeout(() => {
            matchesPopup.classList.add('show');
        }, 100);

        matchesPopup.querySelector('.matches-close').addEventListener('click', () => {
            matchesPopup.classList.remove('show');
            setTimeout(() => {
                matchesPopup.remove();
            }, 300);
        });
    }

    // Update handleLike function to store matches
    function handleLike() {
        const currentProfile = profiles[currentProfileIndex];
        
        // Check if this person has already liked you
        const theirLikes = JSON.parse(localStorage.getItem(`likes_${currentProfile.id}`) || '[]');
        const yourProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const isMatch = theirLikes.includes(yourProfile.id);

        if (isMatch) {
            // It's a match!
            const match = {
                ...currentProfile,
                matchDate: new Date().toLocaleDateString('pt-BR'),
                matchTime: new Date().toISOString()
            };
            
            const matches = JSON.parse(localStorage.getItem('matches') || '[]');
            matches.push(match);
            localStorage.setItem('matches', JSON.stringify(matches));
            
            showMatch(currentProfile);
        }

        // Store your like
        const yourLikes = JSON.parse(localStorage.getItem(`likes_${yourProfile.id}`) || '[]');
        yourLikes.push(currentProfile.id);
        localStorage.setItem(`likes_${yourProfile.id}`, JSON.stringify(yourLikes));
        
        animateCard('right');
        setTimeout(loadNextProfile, 1000);
    }

    function handleDislike() {
        animateCard('left');
        setTimeout(loadNextProfile, 1000);
    }

    function animateCard(direction) {
        const rotation = direction === 'right' ? 30 : -30;
        const translateX = direction === 'right' ? '120%' : '-120%';
        profileCard.style.transform = `translateX(${translateX}) rotate(${rotation}deg)`;
        profileCard.style.opacity = '0';
    }

    function resetCardPosition() {
        profileCard.style.transform = 'translateX(0) rotate(0deg)';
        profileCard.style.opacity = '1';
    }

    // Add smooth transitions between profiles
    function loadNextProfile() {
        const currentCard = document.querySelector('.profile-card');
        currentCard.style.opacity = '0';
        currentCard.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
            const newProfile = profiles[currentProfileIndex];
            const video = document.querySelector('.video-container video');
            video.src = newProfile.video || '';
            
            // Reset media toggle to photo view
            togglePhoto.click();
            
            // Update profile content
            document.querySelector('.profile-image img').src = newProfile.image;
            document.querySelector('.profile-info h2').textContent = `${newProfile.name}, ${newProfile.age}`;
            document.querySelector('.location').innerHTML = 
                `<i class="fas fa-map-marker-alt"></i> ${newProfile.location}`;
            
            const interestsHtml = newProfile.interests
                .map(interest => `<span class="tag">${interest}</span>`)
                .join('');
            document.querySelector('.interests').innerHTML = interestsHtml;
            
            document.querySelector('.bio').textContent = newProfile.bio;
            document.querySelector('.places').textContent = newProfile.places;

            // Reset card position and animate in
            currentCard.style.transform = 'translateX(100%)';
            currentCard.style.opacity = '0';
            
            setTimeout(() => {
                currentCard.style.transform = 'translateX(0)';
                currentCard.style.opacity = '1';
            }, 50);
        }, 300);
    }

    // Search functionality
    const searchIcon = document.querySelector('.search-icon');
    const searchPanel = document.querySelector('.search-panel');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const distanceFilter = document.querySelector('.distance-filter');
    const interestsFilter = document.querySelector('.interests-filter');

    // Toggle search panel
    searchIcon.addEventListener('click', () => {
        searchPanel.classList.toggle('active');
    });

    // Handle search
    searchButton.addEventListener('click', () => {
        const searchParams = {
            query: searchInput.value,
            distance: distanceFilter.value,
            interests: interestsFilter.value
        };
        searchProfiles(searchParams);
    });

    function searchProfiles(params) {
        const genderFilter = document.querySelector('.gender-filter').value;
        const ethnicityFilter = document.querySelector('.ethnicity-filter').value;
        const hairFilter = document.querySelector('.hair-filter').value;
        const eyesFilter = document.querySelector('.eyes-filter').value;
        const distanceFilter = document.querySelector('.distance-filter').value;
        const interestsFilter = document.querySelector('.interests-filter').value;
        const searchQuery = document.querySelector('.search-input').value.toLowerCase();

        // Filter profiles based on all criteria
        const filteredProfiles = profiles.filter(profile => {
            // Basic search query match
            const matchesQuery = searchQuery ? 
                profile.name.toLowerCase().includes(searchQuery) ||
                profile.interests.some(interest => interest.toLowerCase().includes(searchQuery)) ||
                profile.bio.toLowerCase().includes(searchQuery) :
                true;

            // Gender match
            const matchesGender = genderFilter ? profile.gender === genderFilter : true;

            // Ethnicity match
            const matchesEthnicity = ethnicityFilter ? profile.ethnicity === ethnicityFilter : true;

            // Hair color match
            const matchesHair = hairFilter ? profile.hairColor === hairFilter : true;

            // Eye color match
            const matchesEyes = eyesFilter ? profile.eyeColor === eyesFilter : true;

            // Interests match
            const matchesInterest = interestsFilter ? 
                profile.interests.includes(interestsFilter) : 
                true;

            // Distance match (using the existing distance calculation function)
            const matchesDistance = distanceFilter ? 
                calculateDistance(profile.location) <= parseInt(distanceFilter) : 
                true;

            return matchesQuery && 
                   matchesGender && 
                   matchesEthnicity && 
                   matchesHair && 
                   matchesEyes && 
                   matchesInterest && 
                   matchesDistance;
        });

        // Update UI with filtered profiles
        if (filteredProfiles.length > 0) {
            currentProfileIndex = 0;
            profiles.length = 0; // Clear existing profiles
            profiles.push(...filteredProfiles);
            loadNextProfile();
            searchPanel.classList.remove('active');
        } else {
            // Show no results message
            const searchPanel = document.querySelector('.search-panel');
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <p>Nenhum perfil encontrado com esses critérios</p>
                <button class="reset-search">Limpar filtros</button>
            `;
            
            // Remove existing no-results message if any
            const existingNoResults = searchPanel.querySelector('.no-results');
            if (existingNoResults) {
                existingNoResults.remove();
            }
            
            searchPanel.appendChild(noResults);
            
            // Add reset button functionality
            noResults.querySelector('.reset-search').addEventListener('click', () => {
                // Reset all filters
                document.querySelector('.search-input').value = '';
                document.querySelector('.gender-filter').value = '';
                document.querySelector('.ethnicity-filter').value = '';
                document.querySelector('.hair-filter').value = '';
                document.querySelector('.eyes-filter').value = '';
                document.querySelector('.distance-filter').value = '';
                document.querySelector('.interests-filter').value = '';
                
                // Remove no results message
                noResults.remove();
                
                // Reset to all profiles
                currentProfileIndex = 0;
                profiles.length = 0;
                profiles.push(...originalProfiles); // Assuming we store original profiles
                loadNextProfile();
                searchPanel.classList.remove('active');
            });
        }
    }

    // Store a copy of original profiles for reset functionality
    const originalProfiles = [...profiles];

    // Update profile card to show physical characteristics
    function updateProfileCard(profile) {
        // ...existing profile update code...
        
        // Add physical characteristics to profile info
        const characteristicsTags = [
            profile.ethnicity && `<span class="tag"><i class="fas fa-user"></i> ${profile.ethnicity}</span>`,
            profile.hairColor && `<span class="tag"><i class="fas fa-cut"></i> ${profile.hairColor}</span>`,
            profile.eyeColor && `<span class="tag"><i class="fas fa-eye"></i> ${profile.eyeColor}</span>`,
            ...(profile.characteristics || []).map(char => 
                `<span class="tag"><i class="fas fa-check"></i> ${char}</span>`
            )
        ].filter(Boolean).join('');

        const interestsSection = document.querySelector('.interests');
        interestsSection.innerHTML = `
            ${profile.interests.map(interest => 
                `<span class="tag"><i class="fas fa-heart"></i> ${interest}</span>`
            ).join('')}
            ${characteristicsTags}
        `;
    }

    // Update loadNextProfile to use the new updateProfileCard function
    function loadNextProfile() {
        const currentCard = document.querySelector('.profile-card');
        currentCard.style.opacity = '0';
        currentCard.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
            const newProfile = profiles[currentProfileIndex];
            
            // Update gallery images
            const gallerySlider = document.querySelector('.gallery-slider');
            gallerySlider.innerHTML = newProfile.photos.map(photo => 
                `<img src="${photo}" alt="Profile Photo">`
            ).join('');
            
            // Reset gallery position and reinitialize
            gallerySlider.style.transform = 'translateX(0)';
            document.querySelector('.gallery-dots').innerHTML = '';
            initGallery();

            // Update other profile content
            updateProfileCard(newProfile);
            
            // Reset card position and animate in
            currentCard.style.transform = 'translateX(100%)';
            currentCard.style.opacity = '0';
            
            setTimeout(() => {
                currentCard.style.transform = 'translateX(0)';
                currentCard.style.opacity = '1';
            }, 50);
        }, 300);
    }

    // Gallery functionality
    function initGallery() {
        const gallery = document.querySelector('.gallery-slider');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        const dotsContainer = document.querySelector('.gallery-dots');
        
        let currentSlide = 0;
        const slides = gallery.querySelectorAll('img');
        const totalSlides = slides.length;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `gallery-dot${index === 0 ? ' active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        function updateDots() {
            dotsContainer.querySelectorAll('.gallery-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            gallery.style.transform = `translateX(-${currentSlide * 100}%)`;
            updateDots();
        }

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        });

        // Touch events for gallery
        let touchStartX = 0;
        let touchEndX = 0;

        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        gallery.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
            const diff = touchStartX - touchEndX;
            const sensitivity = 50; // minimum swipe distance

            if (Math.abs(diff) > sensitivity) {
                if (diff > 0 && currentSlide < totalSlides - 1) {
                    goToSlide(currentSlide + 1);
                } else if (diff < 0 && currentSlide > 0) {
                    goToSlide(currentSlide - 1);
                }
                touchStartX = touchEndX; // Reset to prevent multiple swipes
            }
        });
    }

    // Update video functionality
    function initVideoControls() {
        const toggleVideo = document.querySelector('.toggle-video');
        const videoContainer = document.querySelector('.video-container');
        const video = videoContainer.querySelector('video');

        toggleVideo.addEventListener('click', () => {
            if (!videoContainer.classList.contains('active')) {
                videoContainer.classList.add('active');
                if (video.src) {
                    video.play();
                }
            } else {
                videoContainer.classList.remove('active');
                video.pause();
            }
        });

        // Close video on click outside
        videoContainer.addEventListener('click', (e) => {
            if (e.target === videoContainer) {
                videoContainer.classList.remove('active');
                video.pause();
            }
        });
    }

    // Initialize gallery and video controls when page loads
    document.addEventListener('DOMContentLoaded', () => {
        // ...existing DOMContentLoaded code...
        initGallery();
        initVideoControls();
    });
});