(function(){
  // Nav dropdowns
  document.addEventListener('click', function(e) {
    var t = e.target.closest('[data-toggle]');
    if (t) {
      var id = t.getAttribute('data-toggle');
      var li = document.getElementById(id);
      var open = li.classList.contains('open');
      document.querySelectorAll('.nav-links>li').forEach(function(el) { el.classList.remove('open'); });
      if (!open) { li.classList.add('open'); }
      return;
    }
    if (!e.target.closest('.nav-links') && !e.target.closest('.nav-hamburger')) {
      document.querySelectorAll('.nav-links>li').forEach(function(el) { el.classList.remove('open'); });
    }
    if (e.target.closest('.nav-hamburger')) {
      var menu = document.getElementById('mobileMenu');
      menu.classList.toggle('open');
      var bars = document.querySelectorAll('.nav-hamburger span');
      if (menu.classList.contains('open')) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars.forEach(function(b) { b.style.transform = ''; b.style.opacity = ''; });
      }
    }
  });

  // Scroll shadow
  window.addEventListener('scroll', function() {
    var nav = document.querySelector('nav');
    if (nav) { nav.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(5,53,116,0.10)' : 'none'; }
  });

  // File name display
  var resumeInput = document.getElementById('resume');
  if (resumeInput) {
    resumeInput.addEventListener('change', function() {
      var fn = document.getElementById('file-name-display');
      if (this.files.length > 0) { fn.style.display = 'block'; fn.textContent = 'Attached: ' + this.files[0].name; }
      else { fn.style.display = 'none'; }
    });
  }

  // EmailJS submit
  var submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    emailjs.init('ZsAm6x2gjm0hFV69o');
    submitBtn.addEventListener('click', function() {
      var fname = document.getElementById('fname').value.trim();
      var lname = document.getElementById('lname').value.trim();
      var email = document.getElementById('email').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var position = document.getElementById('position').value;
      var availability = document.getElementById('availability').value;
      var message = document.getElementById('message').value.trim();

      if (!fname || !lname || !email) {
        alert('Please fill in your first name, last name, and email address.');
        return;
      }
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var params = {
        to_email: 'AkCleaningSuCasa@gmail.com',
        from_name: fname + ' ' + lname,
        from_email: email,
        phone: phone || 'Not provided',
        position: position,
        availability: availability,
        message: message || 'No message provided.'
      };

      emailjs.send('service_8bkln92', 'template_nta16gd', params)
        .then(function() {
          document.getElementById('the-form').style.display = 'none';
          document.getElementById('confirmation').classList.add('show');
        })
        .catch(function() {
          var subject = encodeURIComponent('Job Application: ' + fname + ' ' + lname + ' - ' + position);
          var body = encodeURIComponent(
            'Name: ' + fname + ' ' + lname +
            '\nEmail: ' + email +
            '\nPhone: ' + (phone || 'Not provided') +
            '\nPosition: ' + position +
            '\nAvailability: ' + availability +
            '\n\nMessage:\n' + (message || 'No message provided.')
          );
          window.location.href = 'mailto:AkCleaningSuCasa@gmail.com?subject=' + subject + '&body=' + body;
          document.getElementById('the-form').style.display = 'none';
          document.getElementById('confirmation').classList.add('show');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Application';
        });
    });
  }
})();
