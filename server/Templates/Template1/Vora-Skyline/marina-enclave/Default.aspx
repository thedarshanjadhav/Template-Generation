<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>

    <title>{{TITLE}}</title> 
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta name="title" content="{{TITLE}}">
     <meta name="description" content='{{META_DESCRIPTION}}'>
     <meta name="keywords" content="{{META_KEYWORDS}}">
     <link rel="shortcut icon" href="{{TITLE_ICON}}" type="image/x-icon" />
     <link rel="canonical" href=""/>
    <link rel="stylesheet" href="/css/bt.css" />
    <link rel="stylesheet" href="/css/Animate.css" />
    <link rel="stylesheet" href="/font/css/fontawesome.min.css">
    <link rel="stylesheet" href="/bbfont/css/solid.css">
    <link rel="dns-prefetch" href="http://googletagmanager.com/" crossorigin>

 <style> :root{--colorPrimary:#528da3;--colorSecondary:#335470;--colorBtn:#ffffff}
</style>
</head>
<body>

    <div class="col-md-12 col-lg-9 col-xl-9 col-xs-12 no-gutters" id="home">
        <header class="fixed-top"> 
            <div class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="" href="#home">
                    <img width="150" height="48" src="{{NAVBAR_LOGO}}" class="logo p-1" alt="{{NAVBAR_ALT}}" >
                </a> 
                <button class="navbar-toggler navbar-light" type="button" data-toggle="collapse" id="burger" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <nav class="main-nav navbar-light bg-light"  id="main-nav">
                        <ul class="navbar-nav mr-auto text-center">
                            <li class="nav-item active">
                                <a class="nav-link" href="#about"><i class="fa fa-home nav-icon" aria-hidden="true" style="margin-right: 2px;"></i>{{NAVBAR_NAME}}</a>  
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#price"  style="display: flex; align-items: center;"><img src="img/Rs_icon.svg" alt="rs_icon" width="20px" height="17px" class="aminities-icon"/>Price</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#Floor_plan"><i class="fa fa-building" aria-hidden="true" style="margin-right: 2px;"></i>Floorplan</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#gallery"><i class="fa fa-image"></i> Gallery</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#Amenities"  style="display: flex; align-items: center;"><img src="img/Pool_icon.svg" alt="" width="20px" height="20px" class="aminities-icon"/></i> Amenities</a>
                            </li>
                           
                            <li class="nav-item">
                                <a class="nav-link" href="#highlights"><i class="fa fa-road font-weight-bold nav-icon" aria-hidden="true"></i> Location</a>
                            </li>
                            <li class="nav-item" >
                                <a class="nav-link" href="#" data-toggle="modal" data-target="#myModal"   data-title="Download Brochure" id="DownloadBrochure_head"><i class="fa fa-download font-weight-bold animated slideInDown infinite nav-icon" aria-hidden="true"></i> Brochure</a>
                            </li>
                        </ul>
                </nav>
                            
            </div>  
        </header>
 
<!-- /* Banner Slider */ -->

        <div class="flex-row  position-relative no-gutter">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    {{BANNER_CAROUSEL_INDICATOR}}
                </ol>
                <div class="carousel-inner">
                    {{BANNER_IMAGES}}
                </div>
            </div>

            <div class="bg_trans text-ce" id="bookpanel">
                <div class="bg-success bhead1 effetMoveGradient" id="bookopen">BOOKING OPEN</div>
                <div class="p-2 poscenter">
                    <div><h4 class="text-uppercase">{{PROJECT_NAME}}</h4></div> 
                    <div>
                        <h6>{{LOCATION}}</h6> 
                    </div>
                </div>
                <div>
                    <ul class="list-unstyled padding" >
                        <p>
                        <i class="fa fa-caret-left p-2"></i><span style="padding:5px;">{{LAND_AREA}}</span>
                        <br />
                        <i class="fa fa-caret-left p-2"></i><span style="padding:5px;">{{RESIDENCIES}}</span>
                        <br />
                        <i class="fa fa-caret-left p-2"></i><span style="padding:5px;">{{AMENITIES_HIGHLIGHT}}</span>
                        
                        </p>
                    </ul>
                </div>
                <div class="bg-success effetMoveGradient text-center p-1">{{HIGHLIGHTER1}}</div>
                <div class="aa p-2 animate__bounceIn text-center">{{HIGHLIGHTER2}}</div>
                <div class="bg-success effetMoveGradient text-center p-1">{{HIGHLIGHTER3}}</div>
                
                
                <div class="p-2 poscenter">
                    <h4>
                        {{ONWARDS}}
                    </h4> 
                    <button id="enquire-now" class=" btn btn-success effetMoveGradient animate__swing" data-toggle="modal" data-target="#myModal"  data-title="Enquire Now" >Enquire Now</button>
                </div>
                
                <div class="show" style="margin-top: 24px;">
        <h6 class="aa animate__bounceIn infinite" style="animation-duration: 3s;"><div class="form-last-heading" style="padding: 2px 8px;
            background: #e8e8e8;
            display: flex;
            align-items: center;
            flex-direction: column;"><img src="/img/ola.jpeg" style="width: 50px;" alt="{{PROJECT_NAME}} Ola" /> Free cab facility for site visit</div></h6>
        </div>
            </div>
        <!-- /* Banner Slider End */ -->

        <div class="col-md-12 col-sm-12 col-xs-12" id="about">
        
                    <!-- /* About section */ -->
                        <div class="card bg-light mb-3">
                            <div class="card-body">
                                <h4 class="card-title text-center">Overview</h4> 
                                    <p class="card-text">
                                        {{OVERVIEW}}
                                    </p>
                                    <div class="d-grid gap-2 text-center mx-auto">
                                        <button id="download-brochure" type="button" class="btn btn-success effetMoveGradient" data-toggle="modal" data-target="#myModal"  data-title="Download Brochure">Download Brochure</button>
                                    </div>
                                </div>
                        
                            
                            </div>
                        
                        </div>
                    <!-- /* About section End */ -->
        
                    <!-- /* Price section  */ -->
                
                        <div class="card bg-light mb-3"  id="price" >
                        
                            <div class="card-header text-center"><h4>Price</h4>
                            
                            </div>
                            
                            <div class="card-body">
                                <div class="card-columns1">
                                    <div class="card">
                                        <div class="md-col-9">
                                            <div class="">
                                                <table class="table table-hover">
                                                    <tr>
                                                        <th style="text-align:center;">Type</th>
                                                        <th style="text-align:center;">Carpet Area</th>
                                                        <th style="text-align:center;">Price</th>
                                                    </tr>
                                                    {{TYPE_AND_CARPET_AREA}}                                          
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card card1 no_mar_l_r w-100">
                                        <div class="md-col-3">
                                            <svg class="bd-placeholder-img card-img-top" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Complete Costing Details">
                                                <title>Complete Costing Details</title>
                                                <defs>
                                                    <clipPath id="myrec">
                                                        <rect width="100%" height="100%" fill="#868e96"></rect>
                                                    </clipPath>
                                                </defs>
                                                <text x="35%" y="50%" fill="#dee2e6" dy=".3em">Complete Costing Details</text>
                                                <image width="100%" height="100%" xlink:href="/img/costingdetails.jpeg" clip-path="url(#myrec)" alt="{{PROJECT_NAME}}-Costing-Details" />
                                            </svg>
                                            <div class="overlay">
                                                <div class="text overlay-text" data-toggle="modal" data-target="#myModal"  data-title="Send Me Costing Details" id="costing">ENQUIRE NOW</div>
                                            </div>
                                            <div class="p-2 bg-success effetMoveGradient text-center aq at-property-item">
                                                <h5 class="card-title text-light">Complete Costing Details</h5>
                                                <span id="floorplan"></span>
                                            </div>
                                            
                                        </div>
                                    
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </div>
                        
                    <!-- /* Price section End */ -->

                    <!-- /* Floorplan section */ -->
                        <div class="card bg-light mb-3" id="Floor_plan">
                            <div class="card-header text-center"><h4>Floor Plan</h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    {{FLOORPLAN}}
                                </div>
                            </div>
                        </div>
                    <!-- /* Floorplan section End */ -->

                    <!-- /* Gallery section  */ -->
                        <div class="card bg-light mb-3" id="gallery">
                            <div class="card-header text-center"><h4>Gallery</h4></div>
                            <div class="card-body">
                                <div id="carouselExampleIndicators1" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                        
                                        {{GALLERY_CAROUSEL_INDICATOR}}
                                        
                                    </ol>
                                    
                                    <div class="carousel-inner">
                                        
                                        {{GALLERY_IMAGES}} 
                                    
                                    </div>
                                    <a class="carousel-control-prev" href="#carouselExampleIndicators1" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleIndicators1" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                        <span id="amenities"></span>
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    <!-- /* Gallery section End*/ -->

                    <!-- /* Amenities section */ -->
                    <div class="card bg-light mb-3" id="Amenities">
                        <div class="card-header text-center">
                            <h4>Amenities</h4>
                        </div>
                        <div class="card-body">
                            <div class="row"> 
                                {{AMENITIES_PLACEHOLDER}}
                                
                            <span id="map"> </span>
                            </div>
                        </div>
                    </div>
                    <!-- /* Amenities section End */ -->


                    <!-- /* Map View section */ -->
                    <div class="card bg-light mb-3" id="highlights">
                        <div class="card-body">
                            <div class="card-header text-center">
                                <h4>Map View</h4>
                            </div>
                            <div class="row">
                                <div class="col-md-7">
                                    <div id="map-container-google-1" class="z-depth-1-half map-container">
                                        {{MAP_IFRAME}}
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    {{MAP_NEARBY}}
                                </div>
                            </div>        
                        </div>
                    </div>
                    <!-- /* Map View section End */ -->
            
                
        <!--for mobile footer End-->
            
        <div class="card bg-light mb-3" style="padding-bottom: 17px; justify-content: center;">
            <div class="card-body">
                <h2 class="card-title text-center">About Grassroot Properties</h2><br>
                <p class="card-text">
                    At Grassroot Properties, we specialize in facilitating transactions for residential and commercial properties, non-agriculture plots, 
                    and real estate investment projects. Our dedicated team of real estate experts is committed to guiding you through every step of the 
                    property acquisition process, ensuring a seamless and informed experience.With a focus on Mumbai and Pune locations, Grassroot Properties 
                    extends its reach to cater to the diverse real estate needs of these vibrant cities. Whether you're looking for a dream home, a strategic 
                    commercial space, a valuable investment opportunity, or the perfect non-agriculture plot, we are here to turn your real estate aspirations 
                    into reality. Trust Grassroot Properties to be your reliable partner on your journey to finding and acquiring the property that perfectly 
                    suits your needs and vision.</p>
                <p>Government RERA Authorised Advertiser: Grassroot Properties</p>
                <p>
                    MAHA RERA Registration No: A51800045744
                </p>
                
            </div>      
        </div>


        <div class="card bg-light mb-3" style="padding-bottom: 17px; justify-content: center;">
            <div class="card-body">
                <h4 class="card-title text-center">RERA Number</h4><br>
                        <p class="card-text" style="text-align:center;">
                            Project MahaRERA number is available on the website maharera.mahaonline.gov. in under registered projects.<br>RERA No : {{RERA_NO}} </p>
                        <div class="qrimgset" style="display: flex; justify-content: center; flex-wrap: wrap;">
                            <img src="{{RERA_IMAGE}}" style="width:10% !important" alt="{{RERA_Alt}}" />
                        </div>
            </div>      
        </div>

        <div class="card bg-light mb-3" style="padding-bottom: 17px;">
            <div class="card-body">
                <p class="card-text" style="text-align:center;font-size:15px;">
                    <a href="privacypolicy.html" target="_blank"> Privacy Policy || Terms & Conditions </a> <br>
                    <br>Disclaimer: We are an authorised marketing partner for this project. Provided content is given by respective owners and this website and content is for information purpose only and it does not constitute            
                    any offer to avail for any services. Prices mentioned are subject to change without prior notice and properties mentioned are subject to availability. You can expect a call, SMS or emails on details registered with us.
                    <br>2024 &#169; Copyright - All Rights Reserved.
                </p>
            </div>
        </div>


                </div>           
        <!-- col-12 div end -->
            
        </div>
<!-- flex div end -->

    </div>
    <!-- first div in head div end -->

    <div class="row d-none d-sm-block d-sm-none d-md-block">
        <!-- Right section -->
        <div class="col-md-3 col-lg-3 col-xl-3 col-md col-xs-12">
            <div class="container text-center">
                <div class="sidebar d-none d-sm-block d-sm-none d-md-block responsive-width">
                    <button id="desktop-whatsapp" type="button" class="btn btn-primary btn-dark btn-sm" onclick="window.open('https://api.whatsapp.com/send?phone=+91{{CONTACT}}&text=Hi!%20I\'m%20Interested%20In%20 *{{PROJECT_NAME}} *.%20Please%20Share%20Details.', '_blank');"><i class='fab fa-whatsapp' style="width: 22px;"></i>+91 {{CONTACT}}</button><br>
                    <a href="tel:+91 {{CONTACT}}"><button id="desktop-call" type="button" class="btn btn-primary effetMoveGradient btn-success btn-sm" style=" margin: 10px;">
                        <i class="fa fa-phone" style="rotate: 100deg;"></i>+91 {{CONTACT}}</button></a>
                    <div id="contact_rightform">
                    <div class="card-title">
                        Pre-Register here for Best Offers
                    </div>
                    

    <form id ="rightform" name="West - Suburbs" runat="server">


        <div class="form-group" style="width:95%;"> 
            <asp:TextBox ID="txtName" class="form-control rounded-0 micro-form-field" pattern="[a-zA-Z ]+" runat="server" required
                aria-describedby="" placeholder="Name"></asp:TextBox><br />
        </div>
        <div class="form-group" style="width: 95%;"> 
            <select name="cf_888" data-label="label:Country+Code" class="form-control form-group" id="cc" onChange=selectedCountry(value)
                style="width: 25%;  float: left;">
            <option value="India+91">+91</option> 
            </select>
            <asp:TextBox ID="txtMobile" pattern="^[6-9]\d{9}$" required class="form-control rounded-0 micro-form-field"  MaxLength="10"
                runat="server" placeholder="Mobile" style="float: right; width: 75%;"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ErrorMessage="Mobile No cannot be blank"
            ValidationGroup="sums" ControlToValidate="txtMobile" ForeColor="Red"></asp:RequiredFieldValidator>  
        
        </div> 
        <div class="form-group" style="width: 95%;">
            <asp:TextBox ID="txtEmailId" class="form-control rounded-0 micro-form-field" runat="server" required placeholder="Email ID"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ErrorMessage="Email cannot be blank" ControlToValidate="txtEmailId"
            ValidationGroup="sums" ForeColor="Red"></asp:RequiredFieldValidator>  
            <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txtEmailId"
            ValidationGroup="sums" ErrorMessage="Enter Valid Email Id" ForeColor="Red" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
            <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" ControlToValidate="txtMobile"
                ValidationGroup="sums" ErrorMessage="Mobile number must be 10 digit" ForeColor="Red" ValidationExpression="\d{10}"></asp:RegularExpressionValidator>
        </div> 
        <asp:Button ID="btnSubmit" runat="server" class="btn btn-info micro-form-btn mt-2 effetMoveGradient" UseSubmitBehavior="false" Text="Enquiry Now" 
            ValidationGroup="sums" OnClick="btnsubmit_Serverclick" />

        <div style="margin-top: 24px;">
        <h6 class="aa animate__bounceIn infinite" style="animation-duration: 3s;"><div class="form-last-heading" style="padding: 2px 8px;background: #e8e8e8; display:flex;"><img src="/img/ola.jpeg" style="width: 50px;"> Free cab facility for site visit</div></h6>
        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Right section End -->



<div class="mobile_footer">
   <div class="d-flex flex-row">
       <button id="mobile-call" type="button" class="mob1 bg-green text-center flex-row text-light" onclick="window.location.href='tel:+91 {{CONTACT}}'" class="text-white" >
       <i class="fa fa-phone" style="rotate: 100deg;"></i> Call  </button>  
       <button type="button" id="mobile-enquire" class="mob1 bg-green text-center flex-row text-light" data-toggle="modal" data-target="#myModal" data-title="Mail me pricing details">
       <i class="fa fa-envelope" aria-hidden="true"></i>Enquire</button>
       <button type="button" id="mobile-whatsapp" class="mob1 bg-green text-center flex-row text-light" onclick="window.open(`https://api.whatsapp.com/send?phone=+91{{CONTACT}}&amp;text=Hi!%20I\'m%20Interested%20In%20*{{PROJECT_NAME}} *.%20Please%20Share%20Details.', '_self`);"><i class="fab fa-whatsapp" ></i>WhatsApp</button>
    </div>
</div>



<div class="modal fade" id="myModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="color_white modal-header bg-green">
                <h4 class="modal-title">Mail Me Pricing Details</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
            <div id="contact_form">
                <div class="card-title">
                    Pre-Register here for Best offers
                </div>
            <div class="form-group"  style="width: 95%;"> 
    <asp:TextBox ID="modalName" class="form-control rounded-0 micro-form-field" pattern="[a-zA-Z ]+" runat="server" required
            aria-describedby="" placeholder="Name"></asp:TextBox><br /></div>
            <div class="form-group" style="width: 95%;"> 
                <select name="cf_888" data-label="label:Country+Code" class="form-control form-group" id="cc" onChange=selectedCountry1(value) style="width: 25%;  float: left;">
	                <option value="India+91">+91</option> 
	            </select>
	             <asp:TextBox ID="modalMobile" pattern="^[6-9]\d{9}$" required class="form-control rounded-0 micro-form-field"  MaxLength="10"
                    runat="server" placeholder="Mobile" style="float: right; width: 75%;"></asp:TextBox>
                <asp:RequiredFieldValidator ID="rf1" runat="server" ErrorMessage="Mobile No cannot be blank"
                    ControlToValidate="modalMobile" ForeColor="Red" ValidationGroup="sumk"></asp:RequiredFieldValidator>  
    
            </div> 
<div class="form-group" style="width: 95%;">
    <asp:TextBox ID="modaMail" class="form-control rounded-0 micro-form-field" runat="server" required placeholder="Email ID"></asp:TextBox>
    <asp:RequiredFieldValidator ID="rf3" runat="server" ErrorMessage="Email cannot be blank" ControlToValidate="modaMail"
        ForeColor="Red" ValidationGroup="sumk"></asp:RequiredFieldValidator>  
    <asp:RegularExpressionValidator ID="rev7" runat="server" ControlToValidate="modaMail"
        ErrorMessage="Enter Valid Email Id" ForeColor="Red" ValidationGroup="sumk" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*"></asp:RegularExpressionValidator>
    <asp:RegularExpressionValidator ID="rev2" runat="server" ValidationGroup="sumk" ControlToValidate="modalMobile"
        ErrorMessage="Mobile number must be 10 digit" ForeColor="Red" ValidationExpression="\d{10}"></asp:RegularExpressionValidator>
</div> 
<asp:Button ID="sum" runat="server" class="btn btn-info micro-form-btn mt-2 effetMoveGradient" ValidationGroup="sumk" UseSubmitBehavior="false" Text="Enquiry Now" 
         OnClick="sumclick" />
</form>

<div style="margin-top: 24px;">
<h6 class="aa animate__bounceIn infinite" style="animation-duration: 3s;"><div class="form-last-heading" style="padding: 2px 8px;background: #e8e8e8; display:flex;"><img src="/img/ola.jpeg" style="width: 50px;"> Free cab facility for site visit</div></h6>
</div>


</div>
            </div>
        </div>
    </div>
</div>
<!--End-->
        
<!-- Modal -->

<!--End Modal-->

<script src="/js/jquery.min.js"></script>
<script src="/js/bootstrap.min.js"></script>


<script type="text/javascript">
 const
  burger = document.querySelector("#burger"), 
  nav = document.querySelector("#main-nav"),  // Use ID, if you already use one.
  a = document.querySelectorAll(".nav-link"); // PS: Use the right selectors!

burger.addEventListener("click", function(e) {
  this.classList.toggle("is-open");
  nav.classList.toggle("is-open");
});

a.forEach(el => el.addEventListener("click", function(e) {
  burger.classList.toggle("is-open");
  nav.classList.toggle("is-open");
}));
</script>
<script>
    $('#myModal').on('show.bs.modal', function (event) {
	var button	= $(event.relatedTarget); // Button that triggered the modal 
	var modal = $(this);
	var title = button.data('title');
	modal.find('.modal-title').text(title)
});
</script>

<script src="/js/fa_font.js"></script>

</body>
</html>
