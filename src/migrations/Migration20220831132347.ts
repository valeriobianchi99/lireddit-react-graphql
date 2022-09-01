import { Migration } from '@mikro-orm/migrations';

export class Migration20220831132347 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "title" text not null);');
  }

}

// Created by npx mikro-orm migration:create
// https://mikro-orm.io/docs/migrations
