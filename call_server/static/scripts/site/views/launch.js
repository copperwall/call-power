/*global CallPower, Backbone */

(function () {
  CallPower.Views.CampaignLaunchForm = Backbone.View.extend({
    el: $('#launch'),

    events: {
      'change select#test_call_country': 'changeTestCallCountry',
      'click .test-call': 'makeTestCall',
      'change #embed_type': 'toggleEmbedPanel',
      'blur #custom_embed_options input': 'updateEmbedCode',
      'change #custom_embed_options select': 'updateEmbedCode',
      'change #embed_script_display': 'updateEmbedScriptDisplay',
    },

    initialize: function() {
      this.campaignId = $('#campaignId').val();
      $('.readonly').attr('readonly', 'readonly');
      this.toggleEmbedPanel();
    },

    changeTestCallCountry: function() {
      var country = $('#test_call_country').val();
      if (!country) {
        $('#test_call_country_other').removeClass('hidden')
        country = $('#test_call_country_other').val();
      } else {
        $('#test_call_country_other').addClass('hidden').val('');
      }
    },

    makeTestCall: function(event) {
      var statusIcon = $(event.target).next('.glyphicon');
      statusIcon.removeClass('error').addClass('glyphicon-earphone');
      if (window.location.hostname === 'localhost') {
        alert("Call Power cannot place test calls unless hosted on an externally routable address. Try using ngrok and restarting with the --server option.");
        $(event.target).addClass('disabled');
        statusIcon.addClass('error');
        return false;
      }

      statusIcon.addClass('active');

      var phone = $('#test_call_number').val();
      phone = phone.replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, ''); // remove spaces, parens
      phone = phone.replace("+", "").replace(/\-/g, ''); // remove plus, dash

      var location = $('#test_call_location').val();
      var country = $('#test_call_country').val() || $('#test_call_country_other').val();
      var record = $('#test_call_record').val();

      $.ajax({
        url: '/call/create',
        data: {campaignId: this.campaignId,
          userPhone: phone,
          userLocation: location,
          userCountry: country,
          record: record
        },
        success: function(data) {
          alert('Calling you at '+$('#test_call_number').val()+' now!');
          if (data.call == 'queued') {
            statusIcon.removeClass('active').addClass('success');
            $('.form-group.test_call .controls .help-block').removeClass('has-error').text('');
          } else {
            console.error(data);
            statusIcon.addClass('error');
            $('.form-group.test_call .controls .help-block').addClass('has-error').text(data.responseText);
          }
        },
        error: function(err) {
          console.error(err);
          statusIcon.addClass('error');
          var errMessage = err.responseJSON.error || 'unknown error';
          $('.form-group.test_call .controls .help-block').addClass('has-error').text(errMessage);
        }
      });
    },

    toggleEmbedPanel: function(event) {
      var formType = $('#embed_type').val();
      if (formType) {
        $('.form-group.embed_code').removeClass('hidden');
      } else {
        $('.form-group.embed_code').addClass('hidden');
      }

      if (formType === 'custom' || formType === 'iframe') {
        $('#embed_options').collapse('show');
      } else {
        $('#embed_options').collapse('hide');
      }
      if (formType === 'iframe') {
        $('#embed_options h3').text('iFrame Embed Options');
        $('#embed_options .form-group').hide().filter('.iframe').show();
      } else {
        $('#embed_options h3').text('Javascript Embed Options');
        $('#embed_options .form-group').show();
      }

      this.updateEmbedCode();
      this.updateEmbedScriptDisplay();
    },

    updateEmbedCode: function(event) {
      $.ajax({
        url: '/api/campaign/'+this.campaignId+'/embed_code.html',
        data: {
          'embed_type': $('#embed_type').val(),
          'embed_form_sel': $('#embed_form_sel').val(),
          'embed_phone_sel': $('#embed_phone_sel').val(),
          'embed_location_sel': $('#embed_location_sel').val(),
          'embed_custom_css': $('#embed_custom_css').val(),
          'embed_custom_js': $('#embed_custom_js').val(),
          'embed_script_display': $('#embed_script_display').val(),
        },
        success: function(html) {
          $('textarea#embed_code').val(html);
        }
      });
    },

    updateEmbedScriptDisplay: function(event) {
      var formType = $('#embed_type').val();
      var scriptDisplay = $('#embed_script_display').val();
      
      $('#embed_options .form-group.redirect').toggle(scriptDisplay === 'redirect');
      $('#embed_options .form-group.custom').toggle(scriptDisplay === 'custom');
      $('#embed_options .form-group.iframe').toggle(formType === 'iframe');
    },

  });

})();