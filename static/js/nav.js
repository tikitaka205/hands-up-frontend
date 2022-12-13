document.getElementById('nav-header').innerHTML = `
<div class="humberger__menu__overlay" style="z-index: 995;"></div>
    <div class="humberger__menu__wrapper" style="z-index: 999;">
        <div class="humberger__menu__widget">
            <div class="header__top__right__auth">
                <a href="#"><i class="fa fa-user"></i> Login</a>
            </div>
        </div>
        <div id="mobile-menu-wrap">
            <div class="slicknav_menu">
                <nav class="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu" style="display: none;">
                    <ul>
                        <li class="active"><a href="/index.html" role="menuitem">홈</a></li>
                        <li><a href="/goods/index.html">경매</a></li>
                        <!-- <li><a href="#">Pages</a>
                                <ul class="header__menu__dropdown">
                                    <li><a href="/shop-details.html">Shop Details</a></li>
                                    <li><a href="/shoping-cart.html">Shoping Cart</a></li>
                                    <li><a href="/checkout.html">Check Out</a></li>
                                    <li><a href="/blog-details.html">Blog Details</a></li>
                                </ul>
                            </li> -->
                        <li><a href="/blog/blog.html">게시판</a></li>
                        <li><a href="/contact.html">Contact & Feedback</a></li>
                        <li class="p-2">
                            <input type="text" class="form-control mb-1" placeholder="What do yo u need?" id="search-input-2">
                            <button style="width: 100%;" type="submit" class="btn btn-primary" onclick="searchAuction2()">SEARCH</button>

                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <!-- <div class="header__top__right__social">
                <a href="#"><i class="fa fa-facebook"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-pinterest-p"></i></a>
            </div>
            <div class="humberger__menu__contact">
                <ul>
                    <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                    <li>Free Shipping for all Order of $99</li>
                </ul>
            </div> -->
        </div>
        <!-- Humberger End -->
        <!-- #292610 #24210b 배경   #ffd700 골드-->
    
        <!-- Header Section Begin -->
        <header class="header" style="
        background: linear-gradient(45deg, #ffd567, #c24aff) !important;
        position: sticky;
        z-index: 99;
        width: 100%;
        color: white;
        top: 0;
    ">

        <div class="container">
            <div class="row">
                <div class="col-lg-2">
                    <div class="header__logo">
                        <h1 style="font-size: 30px;font-weight: 800;color: white; padding-top: 10px;">👋 핸즈업</h1>
                    </div>
                </div>
                <div class="col-lg-8" style="padding: 0;">
                    <nav class="header__menu">
                        <ul style="color: white;">
                            <li><a href="/goods/index.html">경매</a>
                                <!-- <ul class="header__menu__dropdown">
                                        <li><a href="/shop-details.html">Shop Details</a></li>
                                        <li><a href="/shoping-cart.html">Shoping Cart</a></li>
                                        <li><a href="/checkout.html">Check Out</a></li>
                                        <li><a href="/blog-details.html">Blog Details</a></li>
                                    </ul> -->
                            </li>
                            <li><a href="/blog/blog.html">게시판</a></li>
                            <li><a href="/contact.html">Contact & Feedback</a></li>
                            <li style="margin-right: 0;">
                                <input type="text" class="form-control" placeholder="What do yo u need?" id="search-input">
                            </li>
                            <li style="margin: 0;" class="btn btn-primary" onclick="searchAuction()">
                                <i class="fas fa-search"></i>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-2">

                    <div class="header__cart">
                        <ul>
                            <li><a href="#"><i class="fa fa-user"></i></a></li>
                            <li><a href="#"><i class="fas fa-bell"></i> <span>3</span></a></li>
                            <i class="fas fa-heart" style="color: black;"></i>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="humberger__open">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </header>
    <!-- Header Section End -->


`