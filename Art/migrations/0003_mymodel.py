# Generated by Django 5.0.4 on 2024-04-16 16:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('Art', '0002_artist_artwork_bid_delete_venue'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('field1', models.CharField(max_length=100)),
                ('field2', models.IntegerField()),
            ],
        ),
    ]
