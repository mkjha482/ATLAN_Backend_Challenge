from __future__ import print_function

import pandas as pd

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from google.oauth2 import service_account

SERVICE_ACCOUNT_FILE = 'sheets_keys2.json'
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

creds = None
creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)

RANGE_N = 'Sheet1!A:F'

# The spreadsheet ID.
SPREADSHEET_ID = '1n_7gzIOd6gfHJu9dRXbtKX5BEqA04JlQomIML7lhyrM'

try:
    service = build('sheets', 'v4', credentials=creds)

    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_N).execute()
    #values = result.get('values', [])
    
    df = pd.DataFrame(result)

    df.to_csv(r'data_out.csv')

except HttpError as err:
        print(err)