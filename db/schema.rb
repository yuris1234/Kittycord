# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_12_22_034007) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.bigint "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", default: "general"
  end

  create_table "dms", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "friend_requests", force: :cascade do |t|
    t.bigint "friender", null: false
    t.bigint "friended", null: false
    t.string "status", default: "pending", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friended"], name: "index_friend_requests_on_friended"
    t.index ["friender", "friended"], name: "index_friend_requests_on_friender_and_friended", unique: true
  end

  create_table "friends", force: :cascade do |t|
    t.bigint "friend_1", null: false
    t.bigint "friend_2", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_1", "friend_2"], name: "index_friends_on_friend_1_and_friend_2", unique: true
    t.index ["friend_2"], name: "index_friends_on_friend_2"
  end

  create_table "membership_joins", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "membership_type", null: false
    t.bigint "membership_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["membership_type", "membership_id"], name: "index_membership_joins_on_membership"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body", null: false
    t.bigint "author_id", null: false
    t.string "messageable_type"
    t.bigint "messageable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["messageable_type", "messageable_id"], name: "index_messages_on_messageable"
  end

  create_table "servers", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", default: "server"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status", default: "offline", null: false
    t.string "pfp_url", default: "/unknown.png"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "channels", "servers"
  add_foreign_key "friend_requests", "users", column: "friended"
  add_foreign_key "friend_requests", "users", column: "friender"
  add_foreign_key "friends", "users", column: "friend_1"
  add_foreign_key "friends", "users", column: "friend_2"
  add_foreign_key "membership_joins", "users"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "servers", "users", column: "owner_id"
end
