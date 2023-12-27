# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password',
      pfp_url: 'profilepic',
      status: 'offline'
    )

    User.create!(
      username: 'bobbycat', 
      email: 'bobbycat@gmail.com', 
      password: 'password',
      pfp_url: 'profilepic',
      status: 'offline'
    )

    User.create!(
      username: 'kolacat', 
      email: 'colacat@gmail.com', 
      password: 'password',
      pfp_url: 'profilepic',
      status: 'offline'
    )

    User.create!(
      username: 'leesoo', 
      email: 'leesoo@gmail.com', 
      password: 'password',
      pfp_url: 'profilepic',
      status: 'offline'
    )

    User.create!(
      username: 'gamingcat', 
      email: 'gamingcat@gmail.com', 
      password: 'password',
      pfp_url: 'profilepic',
      status: 'offline'
    )

    User.create!(
      username: 'lazycat', 
      email: 'lazycat@gmail.com', 
      password: 'password',
      pfp_url: 'profilepic',
      status: 'offline'
    )

    Friend.create!(
      friend_1: 1,
      friend_2: 2
    )
    Friend.create!(
      friend_1: 1,
      friend_2: 3
    )
    Friend.create!(
      friend_1: 1,
      friend_2: 4
    )
    FriendRequest.create!(
      friender: 1,
      friended: 5
    )

    FriendRequest.create!(
      friender: 6,
      friended: 1
    )

    Server.create!(
      owner_id: 1
    )

    Channel.create!(
      server_id: 1
    )

    MembershipJoin.create!(
      user_id: 1,
      membership_type: "Server",
      memership_id: 1
    )

    MembershipJoin.create!(
      user_id: 2,
      membership_type: "Server",
      memership_id: 1
    )

    Dm.create!()

    MembershipJoin.create!(
      user_id: 1,
      membership_type: "Dm",
      memership_id: 1
    )

    MembershipJoin.create!(
      user_id: 3,
      membership_type: "Dm",
      memership_id: 1
    )


    puts "Done!"
  end