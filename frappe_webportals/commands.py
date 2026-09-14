import click
import json
import frappe

@click.command("list-app-sites")
@click.argument("app")
def list_app_sites(app):
    """Mock command to satisfy frappe-ui/vite plugin expectations"""
    # Simply outputs an array with your target local site
    print(json.dumps(["flairdentalcare.localhost"]))

commands = [list_app_sites]