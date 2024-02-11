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
    Server.destroy_all
    Friend.destroy_all
    FriendRequest.destroy_all
    Channel.destroy_all
    MembershipJoin.destroy_all
    Message.destroy_all
    Dm.destroy_all

  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('friends')
    ApplicationRecord.connection.reset_pk_sequence!('friend_requests')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('membership_joins')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('dms')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo-lition', 
      email: 'demo@user.io', 
      password: 'password',
      pfp_url: 'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg',
      status: 'offline'
    )

    User.create!(
      username: 'bobbycat', 
      email: 'bobbycat@gmail.com', 
      password: 'password',
      pfp_url: 'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*',
      status: 'offline'
    )

    User.create!(
      username: 'kolacat', 
      email: 'colacat@gmail.com', 
      password: 'password',
      pfp_url: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      status: 'offline'
    )

    User.create!(
      username: 'leesoo', 
      email: 'leesoo@gmail.com', 
      password: 'password',
      pfp_url: 'https://wallpapers.com/images/featured/cat-pictures-zc3gu0636kmldm04.jpg',
      status: 'offline'
    )

    User.create!(
      username: 'gamingcat', 
      email: 'gamingcat@gmail.com', 
      password: 'password',
      pfp_url: 'https://www.forbes.com/advisor/wp-content/uploads/2023/09/how-much-does-a-cat-cost.jpeg-900x510.jpg',
      status: 'offline'
    )

    User.create!(
      username: 'lazycat', 
      email: 'lazycat@gmail.com', 
      password: 'password',
      pfp_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
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

    server = Server.create!(
      owner_id: 1
    )

    Channel.create!(
      server_id: server.id
    )

    MembershipJoin.create!(
      user_id: 1,
      membership_type: "Server",
      membership_id: server.id
    )

    MembershipJoin.create!(
      user_id: 2,
      membership_type: "Server",
      membership_id: 1
    )

    Dm.create!()

    MembershipJoin.create!(
      user_id: 1,
      membership_type: "Dm",
      membership_id: 1
    )

    MembershipJoin.create!(
      user_id: 3,
      membership_type: "Dm",
      membership_id: 1
    )


    puts "Done!"
  end