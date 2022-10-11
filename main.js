const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const player = $('.player');
const playList = $('.playlist');
const headingDashboard = $('header>h2');
const cd = $('.cd');
const cdThumbDashboard = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const isPlaying = false;



const app = {
  currentIndex: JSON.parse(localStorage.getItem('currentIndex')) || 0,
  isRandom: JSON.parse(localStorage.getItem('isRandom')) || false,
  isRepeat: JSON.parse(localStorage.getItem('isRepeat')) || false,
  songs: [
    {
      name: '20 Năm Ở Thế Giới',
      singer: 'Thịnh Suy',
      path: './music/20NamOTheGioi-ThinhSuy.flac',
      image: './img/20nam.jpg'
    },
    {
      name: 'Bài Ca Tuổi Trẻ',
      singer: 'Da LAB',
      path: './music/Bai Ca Tuoi Tre - Da LAB.mp3',
      image: './img/no_img.jpg'
    },
    {
      name: 'Chiều Nay Không Có Mưa Bay',
      singer: 'Trung Quân Idol',
      path: './music/Chieu Nay Khong Co Mua Bay - Trung Quan.flac',
      image: './img/chieunaykhongcomuabay.jpg'
    },
    {
      name: 'Chưa Bao Giờ',
      singer: 'Trung Quân Idol',
      path: './music/Chua Bao Gio - Trung Quan.flac',
      image: './img/no_img.jpg'
    },
    {
      name: 'Có Chàng Trai Viết Lên Cây',
      singer: 'Phan Mạnh Quỳnh',
      path: './music/Co Chang Trai Viet Len Cay - Phan Manh Q.flac',
      image: './img/phanmanhquynh-nuocngoai.jpg'
    },
    {
      name: 'Dấu Mưa',
      singer: 'Trung Quân Idol',
      path: './music/Dau Mua - Trung Quan.flac',
      image: './img/daumua.jpg'
    },
    {
      name: 'Dù Cho Mai Về Sau',
      singer: 'Buitruonglinh',
      path: './music/Du Cho Mai Ve Sau - buitruonglinh.flac',
      image: './img/no_img.jpg'
    },
    {
      name: 'Lối Nhỏ',
      singer: 'Đen',
      path: './music/Loi Nho - Den_ Phuong Anh Dao.flac',
      image: './img/loinho.jpg'
    },
    {
      name: 'Một Đêm Say',
      singer: 'Thịnh Suy',
      path: './music/Mot Dem Say - Andiez_ Thinh Suy.flac',
      image: './img/no_img.jpg'
    },
    {
      name: 'Nước Ngoài',
      singer: 'Phan Mạnh Quỳnh',
      path: './music/Nuoc Ngoai - Phan Manh Quynh.flac',
      image: './img/phanmanhquynh-nuocngoai.jpg'
    },
    {
      name: 'Say You Do',
      singer: 'Tiên Tiên',
      path: './music/Say You Do - Tien Tien.flac',
      image: './img/sayyoudo.jpg'
    },
    {
      name: 'Thất Tình',
      singer: 'Trịnh Đình Quang',
      path: './music/That Tinh - Trinh Dinh Quang.flac',
      image: './img/thattinh.jpg'
    },
    {
      name: 'Thu Cuối',
      singer: 'Yanbi, Mr_T, Hang Bingbong',
      path: './music/Thu Cuoi - Yanbi_ Mr_T_ Hang BingBoong.flac',
      image: './img/thucuoi.jpg'
    },
  ],

  render: function () {
    // let html = "<div style='height: 203px'></div>"
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
          <div
            class="thumb"
            style="
              background-image: url('${song.image}');
            "
          ></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      `
    });

    playList.innerHTML = htmls.join('');

    localStorage.setItem('currentIndex', JSON.stringify(this.currentIndex));
  },
  // định nghĩa this.currentSong
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex];
      }
    })
  }
  ,
  handleEvents: function (listSongHtml) {
    const cdWidth = cd.offsetWidth;
    const _this = this;
    // const isPlaying = false;

    //Xử lý CD quay và dừng
    const cdThumbAnimate = cdThumbDashboard.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 10000,
      iterations: Infinity
    })

    cdThumbAnimate.pause();
    //Xử lý phóng to thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - Math.floor(scrollTop / 2.03);
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    }

    //Xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      }
      else {
        audio.play();
      }

    }

    //Khi bài hát đang dc phát
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    }

    //Khi bài hát bị dừng
    audio.onpause = function () {
      player.classList.remove("playing");
      _this.isPlaying = false;
      cdThumbAnimate.pause();
    }

    //Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressValue = (audio.currentTime / audio.duration * 100);
        progress.value = progressValue;
      }
    }

    //Xử lý khi tua bài hát
    progress.oninput = function () {
      const seekTime = progress.value * audio.duration / 100;
      audio.currentTime = seekTime;
    }

    //Xử lý khi next bài hát
    nextBtn.onclick = function () {
      _this.nextSong();
      audio.play();
      _this.scrollActiveSong();
      // _this.render();
    }

    //Xử lý khi prev bài hát
    prevBtn.onclick = function () {
      _this.prevSong();
      audio.play();
      _this.scrollActiveSong();
      // _this.render();

    }

    //Xử lý khi random được click
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active");
      localStorage.setItem('isRandom', JSON.stringify(_this.isRandom));
    }

    //Xử lý khi repeat được click
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active");
      localStorage.setItem('isRepeat', JSON.stringify(_this.isRepeat));
    }

    //Xử lý khi song ended
    audio.onended = function () {
      if (!_this.isRepeat) {
        _this.nextSong();
        _this.scrollActiveSong();

      }
      audio.play();
    }


    //Lắng nghe sự khiện song dc click
    playList.onclick = function (e) {
      const songNode = e.target.closest('.song:not(.active)')
      if (!e.target.closest('.option')) {
        _this.currentIndex = Number(songNode.dataset.index);
        _this.loadCurrentSong();
        audio.play();
      }
    };

  },
  scrollActiveSong: function () {
    if (this.currentIndex === 0) {
      window.scrollTo(0, 0);
    }
    if (this.currentIndex > 3) {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
  ,
  loadCurrentSong: function () {
    headingDashboard.textContent = this.currentSong.name;
    cdThumbDashboard.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
    progress.value = 0;
    this.render();
  },
  loadConfig: function () {
    //Xử lý scroll đến bài hiện tại trong local
    this.scrollActiveSong();
    //Xử lý trạng thái 2 nút random và repeat
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
  ,
  nextSong: function () {
    if (this.isRandom) {
      this.randomSong();
    } else {
      this.currentIndex++;
      if (this.currentIndex >= this.songs.length) {
        this.currentIndex = 0;
      }
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    if (this.isRandom) {
      this.randomSong();
    } else {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.songs.length - 1;
      }
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex)
    this.currentIndex = newIndex;
  },

  start: function () {
    // render playlist
    this.render();
    // Định nghĩa các thuộc tính obj
    this.defineProperties();
    // Tải bài hát đầu tiên vào UI khi mở app
    this.loadCurrentSong();
    this.loadConfig();
    // Lắng nghe xử lý các sự kiện
    this.handleEvents();

  },
}

app.start();



