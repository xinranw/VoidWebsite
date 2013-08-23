// Generated by CoffeeScript 1.6.3
(function() {
  var Player, TeamRoster, Void2014;

  Player = (function() {
    var data, description, img_src, name;

    name = "";

    data = {};

    img_src = "";

    description = "";

    function Player(name, nicknames, number, hometown, position, year, past_teams, img_src, description) {
      this.name = name;
      data = {
        "nicknames": nicknames,
        "number": number,
        "hometown": hometown,
        "position": position,
        "year": year,
        "past_teams": past_teams
      };
      this.img_src = img_src;
      this.description = description;
    }

    Player.prototype.getName = function() {
      return this.name;
    };

    Player.prototype.getData = function() {
      return data;
    };

    Player.prototype.getImg = function() {
      return this.img_src;
    };

    Player.prototype.getDescription = function() {
      return this.description;
    };

    return Player;

  })();

  this.Player = Player;

  TeamRoster = (function() {
    var roster;

    roster = {};

    function TeamRoster() {}

    TeamRoster.prototype.addPlayerArray = function(arr) {
      var _this = this;
      return $.each(arr, function(i, player) {
        return roster[player.name] = player;
      });
    };

    TeamRoster.prototype.getRoster = function() {
      return roster;
    };

    return TeamRoster;

  })();

  this.TeamRoster = TeamRoster;

  Void2014 = (function() {
    var player_array, team_roster;

    player_array = [new Player("Tate Tabtieng", "Yang, Taterade", 29, "Sudbury, MA", "Handler", "2014", "Hypnotoad", "images/profile_photos/xinran_wang.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut metus felis, vehicula id iaculis sit amet, viverra pretium sapien. Donec sit amet egestas quam. Mauris vel augue a massa pharetra tincidunt vitae a felis. Nulla condimentum lectus in luctus feugiat. Aliquam lorem sem, volutpat ut lobortis volutpat, faucibus id quam. Vestibulum ac malesuada metus. Nullam nec metus ac mauris ullamcorper elementum."), new Player("Xinran Wang", "Yin, Xin, Flytrap, Zoneran", 10, "Lower Merion, PA", "Handler", "2014", "Gavel, City Wide Special", "images/profile_photos/xinran_wang.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut metus felis, vehicula id iaculis sit amet, viverra pretium sapien. Donec sit amet egestas quam. Mauris vel augue a massa pharetra tincidunt vitae a felis. Nulla condimentum lectus in luctus feugiat. Aliquam lorem sem, volutpat ut lobortis volutpat, faucibus id quam. Vestibulum ac malesuada metus. Nullam nec metus ac mauris ullamcorper elementum.")];

    team_roster = null;

    function Void2014() {
      team_roster = new TeamRoster();
      team_roster.addPlayerArray(player_array);
    }

    Void2014.prototype.getTeamRoster = function() {
      return team_roster;
    };

    return Void2014;

  })();

  this.Void2014 = Void2014;

}).call(this);
