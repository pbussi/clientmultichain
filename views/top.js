  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Cliente TECOM</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="badges.html">Cuentas</a></li>
        <li><a href="collapsible.html">Usuarios</a></li>
      </ul>
    </div>
  </nav>
  <br>
  <% if(locals.flash.warningMessage){ %>
  <div id="card-alert" class="card orange">
    <div class="card-content white-text">
          <p><i class="mdi-alert-warning"></i> ATENCION : <%- locals.flash.warningMessage %></p>
    </div>
  </div>
  <% } %>
  <% if(locals.flash.errorMessage){ %>
  <div id="card-alert" class="card red">
    <div class="card-content white-text">
          <p><i class="mdi-alert-error"></i> ERROR : <%- locals.flash.errorMessage %></p>
    </div>
  </div>
  <% } %>
  <% if(locals.flash.successMessage){ %>
  <div id="card-alert" class="card green">
    <div class="card-content white-text">
          <p><i class="mdi-navigation-check"></i> Operación exitosa : <%- locals.flash.successMessage %></p>
    </div>
  </div>
  <% } %>
