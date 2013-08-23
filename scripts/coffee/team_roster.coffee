class Player
  name = ""
  data = {}
  img_src = "" 
  description = ""
  constructor: (name, nicknames, number, hometown, position, year, past_teams, img_src, description)->
    this.name = name
    data = {
      "nicknames" : nicknames,
      "number" : number,
      "hometown" : hometown,
      "position" : position, 
      "year" : year,
      "past_teams" : past_teams
    }
    this.img_src = img_src
    this.description = description
  getName: ()->
    return this.name
  getData: ()->
    return data
  getImg: ()->
    return this.img_src
  getDescription: ()->
    return this.description

this.Player = Player


class TeamRoster
  roster = {}

  constructor: ()->

  addPlayerArray: (arr)->
    $.each(arr, (i, player)=>
      roster[player.name] = player
      )

  getRoster: ()->
    return roster;

this.TeamRoster = TeamRoster

class Void2014
  player_array = [
    new Player("Tate Tabtieng", "Yang, Taterade", 29,"Sudbury, MA", "Handler", "2014", "Hypnotoad", "images/profile_photos/xinran_wang.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut metus felis, vehicula id iaculis sit amet, viverra pretium sapien. Donec sit amet egestas quam. Mauris vel augue a massa pharetra tincidunt vitae a felis. Nulla condimentum lectus in luctus feugiat. Aliquam lorem sem, volutpat ut lobortis volutpat, faucibus id quam. Vestibulum ac malesuada metus. Nullam nec metus ac mauris ullamcorper elementum."),
    new Player("Xinran Wang", "Yin, Xin, Flytrap, Zoneran", 10, "Lower Merion, PA", "Handler", "2014", "Gavel, City Wide Special", "images/profile_photos/xinran_wang.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut metus felis, vehicula id iaculis sit amet, viverra pretium sapien. Donec sit amet egestas quam. Mauris vel augue a massa pharetra tincidunt vitae a felis. Nulla condimentum lectus in luctus feugiat. Aliquam lorem sem, volutpat ut lobortis volutpat, faucibus id quam. Vestibulum ac malesuada metus. Nullam nec metus ac mauris ullamcorper elementum.")
  ]
  team_roster = null;

  constructor: ()->
    team_roster = new TeamRoster()
    team_roster.addPlayerArray(player_array)

  getTeamRoster: ()->
    return team_roster

this.Void2014 = Void2014
