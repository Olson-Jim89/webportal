
<?php $session_value = (isset($_SESSION['current_user']))?$_SESSION['current_user']:''?>   
<div class="links">

</div>
    <script>
        var current_user = '<?php echo $session_value;?>';
        select("category","SELECT * FROM category WHERE useraccount_id =" + current_user + ";",".links");
    </script>
<div class="code" style="background:white;">

</div>