<?php
	require_once('config.php');
?>
<html>
	<head>
		<title>Mini-Website</title>
		<script src="js/jquery-1.11.3.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="css.css" />
		
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	</head>
	
	<body>
		<!-- Non-mobile NavBar -->
		<nav id="navbar" class="hidden-xs">
			<ul id="navlist" class="container">
				<?php
					// Non-mobile NavList
					foreach ($tabs as $key => $value)
					{
						echo '<li class="navitem" id="' . $key . '">' . $value . '</li>';
					}
				?>
			</ul>
		</nav>		
		
		<!-- Mobile NavBar -->
		<nav id="navbarm" class="visible-xs">
			<div style="position:relative;">
				<span id="pullNav" class="glyphicon glyphicon-menu-right" ></span>
			</div>
			
			<ul id="navlistm" class="container">
				<div style="position:relative;">
					<span id="pushNav" class="glyphicon glyphicon-menu-left" ></span>
				</div>
				<?php
					// Mobile NavList
					foreach ($tabs as $key => $value)
					{
						echo '<li class="navitemm" id="' . $key . '">' . $value . '</li>';
					}
				?>
			</ul>
		</nav>
		
		<div class="container main">
				<?php
					// Non-mobile NavList
					foreach ($tabs as $key => $value)
					{
						echo '<div class="content" id="' . $key . '-content">';
						echo '</div>';
					}
				?>
		</div>
		<script src="java.js"></script>
	</body>
</html>