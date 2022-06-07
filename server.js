jQuery('#dataform').on('submit',function(e){
    e.preventDefault();
    jQuery('#response').html('Please wait...!');
    jQuery('#but').attr('disabled',true);
    var c_id=document.getElementById('cid').value;
    var c_email=document.getElementById('cem').value;
    var c_name=document.getElementById('cnme').value;
    var c_income=document.getElementById('cinc').value;
    var c_saving=document.getElementById('csav').value;
    var c_contact=document.getElementById('ccont').value;
    

    if(c_income<c_saving){
        alert('income can not be less than savings');
        jQuery('#response').html('Verify the data entered again...!');
        jQuery('#but').attr('disabled',false);
        return;
    }
    if((c_contact.length)<10){
        alert('contact number can not be less than 10 digits');
        jQuery('#response').html('Verify the data entered again...!');
        jQuery('#but').attr('disabled',false);
        return;
    }
    jQuery.ajax({
        url: 'https://script.google.com/macros/s/AKfycbz0BsITIyAqSdfgaI1tj6YULs17O7HbL3_4HwT5jT6F-99F0gj3Qg-58SW01QW_D2KxJQ/exec',
        type: 'post',
        data: jQuery('#dataform').serialize(),
        success:function(result){
            console.log(result);
            jQuery('#dataform')[0].reset();
            jQuery('#response').html('Data uploaded to google-sheets successfully...!');
            jQuery('#but').attr('disabled',false);

        }
    })
});