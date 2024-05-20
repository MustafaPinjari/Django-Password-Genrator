from django.http import HttpResponse
from django.shortcuts import render
import string

def about_view(request):
    return render(request, 'about.html')

def index(request):
    return render(request, 'index.html')


def analyzer(request):
    djtext = request.GET.get('text', 'default')
    spaceremover = request.GET.get('spaceremover', 'off')
    countlength = request.GET.get('countlength', 'off')
    uppercase = request.GET.get('uppercase', 'off')
    lowercase = request.GET.get('lowercase', 'off')
    removepunctuation = request.GET.get('removepunctuation', 'off')
    titlecase = request.GET.get('titlecase', 'off')
    reverse = request.GET.get('reverse', 'off')

    original_text = djtext  # Store the original text
    analyzed_text = djtext  # Initialize analyzed_text with the original text
    transformations = []  # Initialize a list to store the transformations applied

    # Debug log
    print(f"Original Text: {original_text}")

    # Remove Punctuation
    if removepunctuation == "on":
        punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
        analyzed_text = "".join(char for char in analyzed_text if char not in punctuations)
        transformations.append('Removed Punctuation')
        print(f"After Removing Punctuation: {analyzed_text}")

    # Remove Space
    if spaceremover == "on":
        analyzed_text = analyzed_text.replace(" ", "")
        transformations.append('Removed Space')
        print(f"After Removing Space: {analyzed_text}")

    # Count Length
    if countlength == "on":
        length = len(analyzed_text)
        transformations.append(f'Count Length: {length}')
        print(f"Length of Text: {length}")

    # Upper Case
    if uppercase == "on":
        analyzed_text = analyzed_text.upper()
        transformations.append('Converted to Upper Case')
        print(f"After Converting to Upper Case: {analyzed_text}")

    # Lower Case
    if lowercase == "on":
        analyzed_text = analyzed_text.lower()
        transformations.append('Converted to Lower Case')
        print(f"After Converting to Lower Case: {analyzed_text}")

    # Title Case
    if titlecase == "on":
        analyzed_text = analyzed_text.title()
        transformations.append('Converted to Title Case')
        print(f"After Converting to Title Case: {analyzed_text}")

    # Reverse String
    if reverse == "on":
        analyzed_text = analyzed_text[::-1]
        transformations.append('Reversed String')
        print(f"After Reversing String: {analyzed_text}")

    params = {
        'original_text': original_text,
        'transformations': transformations,
        'analyzed_text': analyzed_text,
    }

    return render(request, 'analyzer.html', params)
