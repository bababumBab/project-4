# Generated by Django 3.0.5 on 2020-04-22 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('freshSneakers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sneaker',
            name='collorway',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='sneaker',
            name='purchase_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
        migrations.AlterField(
            model_name='sneaker',
            name='retail_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
        migrations.AlterField(
            model_name='sneaker',
            name='sneaker_type',
            field=models.CharField(choices=[('LIFESTYLE', 'Lifestyle'), ('READYTOWEAR', 'Ready-to-Wear'), ('CASUAL', 'Casual'), ('BOOTS', 'Boots'), ('RUNNING', 'Running'), ('OUTDOOR', 'Outdoor'), ('TRAINING', 'Training'), ('FOOTBALL', 'Football'), ('BASKETBALL', 'Basketball'), ('TENNIS', 'Tennis'), ('GOLF', 'Golf'), ('RUGBY', 'Rugby'), ('WEIGHTLIFTING', 'Weightlifting'), ('SKATEBOARDING', 'Skateboarding')], default='', max_length=50),
        ),
    ]
