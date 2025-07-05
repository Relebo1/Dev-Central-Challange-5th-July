#!/usr/bin/env python3

"""
Database initialization script for Phetoho
Run this script to create and populate the database with sample data
"""

from database.init_db import init_database

if __name__ == '__main__':
    print("Initializing Phetoho database...")
    init_database()
    print("Database setup complete!")