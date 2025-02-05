<style>
    .card-back {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f8f8f8;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
    }
  
    .card-back img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }
  
    .card-back::before {
      top: 10px;
    }
  
    .card-back::after {
      bottom: 10px;
      transform: rotate(180deg);
    }

    .logo {
      width: 100%;
      height: 100%;
      object-fit: fill;
      border-radius: 10px;
    }
  </style>
  
  <div class="card-back">
    <img class="logo" src="https://yt3.googleusercontent.com/OUL0OYY1np_pgKFe6hLEm9XLH5OsIa1PBCg3T3Zf_301LkJLe0lXYqQKKN8f6d-8uvQgBn8-=s900-c-k-c0x00ffffff-no-rj" alt="Enable Logo">
  </div>