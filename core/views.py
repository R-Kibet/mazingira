import hashlib

import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.templatetags.static import static
from django.utils.html import strip_tags

from django.shortcuts import render


def home(request):
    """Landing page for Mazingira Sustainability Village (MSV)."""

    focus_areas = [
    {'icon': 'core/images/ab2.png', 'title': 'Water Security & Watershed Protection'},
    {'icon': 'core/images/ab3.png', 'title': 'Tree Growing & Ecosystem Restoration'},
    {'icon': 'core/images/ab5.png', 'title': 'Circular Economy & Green Innovation'},
    {'icon': 'core/images/ab4.png', 'title': 'Sports for Sustainability Advocacy'},
    ] 

    core_values = [
        {
            'title': 'Collaboration',
            'description': (
                'Lasting impact is built through partnerships-bringing '
                'together communities, corporates, government, and '
                'institutions to solve shared challenges.'
            ),
        },
        {
            'title': 'Commitment',
            'description': (
                'Driven by consistency, accountability, and a long-term '
                'dedication to sustainability and impact.'
            ),
        },
        {
            'title': 'Community',
            'description': (
                'Rooted in local ownership and grassroots participation, '
                'empowering people as active stewards of their environment.'
            ),
        },
        {
            'title': 'Conservation',
            'description': (
                'Ecosystem protection, restoration, and responsible '
                'resource management at the heart of everything we do.'
            ),
        },
    ]

    impact_milestones = [
        {
            'year': '2027',
            'label': 'Target',
            'headline': '1 Million Trees',
            'description': (
                'A rapid scale-up phase focused on establishing the '
                "programme's infrastructure, partnerships, nursery "
                'capacity, community networks, and initial restoration '
                'sites.'
            ),
        },
        {
            'year': '2032',
            'label': 'Target',
            'headline': '50 Million Trees',
            'description': (
                'A long-term ecosystem restoration ambition that will '
                'transform the Green Drive into a major landscape-scale '
                'tree-growing and conservation programme across the '
                'Aberdare Catchment and surrounding communities.'
            ),
        },
    ]

    gallery_photos = [
        'core/images/g1.jpg',
        'core/images/g2.jpg',
        'core/images/g3.jpg',
        'core/images/g4.jpg',
        'core/images/g5.jpg',
        'core/images/g6.jpg',
    ]

    context = {
        'focus_areas': focus_areas,
        'core_values': core_values,
        'impact_milestones': impact_milestones,
        'gallery_photos': gallery_photos,
    }
    return render(request, 'core/home.html', context)


def impact(request):
    """Impact page for Mazingira Sustainability Village (MSV)."""

    # Each row of the "Expected Impact by 2032" table.
    # 'icon' is left blank on purpose -- the template falls back to a
    # placeholder circle whenever it's empty. Drop a static image path in
    # here (e.g. 'core/images/impact-trees.png') per row once the icons are
    # ready, or point every row at the same file to reuse one icon for all.
    impact_details = [
        {
            'icon': 'core/images/tree1.png',
            'title': '50 Million Trees',
            'description': 'Planted and nurtured across the programme landscape.',
        },
        {
            'icon': 'core/images/im2.png',
            'title': 'Water Security',
            'description': (
                'Improved protection of the Aberdare Catchment and water '
                'sources feeding Ndakaini Dam and the wider Nairobi water '
                'system.'
            ),
        },
        {
            'icon': 'core/images/im3.png',
            'title': 'Climate Action',
            'description': 'Increased carbon sequestration and improved climate resilience.',
        },
        {
            'icon': 'core/images/im4.png',
            'title': 'Forest Restoration',
            'description': (
                'Rehabilitation of degraded landscapes and increased '
                'tree and forest cover.'
            ),
        },
        {
            'icon': 'core/images/im5.png',
            'title': 'Biodiversity',
            'description': 'Improved habitats and ecosystem health.',
        },
        {
            'icon': 'core/images/im6.png',
            'title': 'Community Livelihoods',
            'description': (
                'Commercial fruit trees and productive tree systems '
                'creating food security, income, and green livelihood '
                'opportunities.'
            ),
        },
        {
            'icon': 'core/images/im7.png',
            'title': 'Environmental Education',
            'description': (
                'Schools and young people engaged as the next generation '
                'of environmental stewards.'
            ),
        },
        {
            'icon': 'core/images/im8.png',
            'title': 'Corporate ESG Impact',
            'description': (
                'A structured platform through which companies can '
                'directly invest in measurable, place-based environmental '
                'and social outcomes.'
            ),
        },
    ]

    context = {
        'impact_details': impact_details,
        # Update this path to whatever you named the hero background you
        # already added to core/images/.
        'hero_image': 'core/images/impact-hero.png',
    }
    return render(request, 'core/impact.html', context)

def marathon(request):
    """Nairobi Water Ndakaini Mazingira Half Marathon page."""

    info_items = [
    {'label': 'EVENT NAME', 'value': 'Ndakaini Mazingira Half Marathon', 'icon': 'calendar-check'},
    {'label': 'EVENT DATE', 'value': '10th October (Mazingira Day)', 'icon': 'calendar'},
    {'label': 'VENUE', 'value': 'Ndakaini Dam, Murang\u2019a', 'icon': 'location'},
    {'label': 'INTEGRATED CAUSE', 'value': 'Sustainability', 'icon': 'idea'},
    {'label': 'EXPECTED TURN OUT', 'value': 'Over 10,000 participants', 'icon': 'people'},
]

    races = [
        {'name': '21KM Half Marathon', 'fee': 'KES 2,500/-', 'width': 100},
        {'name': '10KM Corporate & Fun Run', 'fee': 'KES 2,500/-', 'width': 92},
        {'name': '8KM Community Run', 'fee': 'KES 2,500/-', 'width': 84},
        {'name': '5KM Pace', 'fee': 'KES 1000/-', 'width': 76},
        {'name': '2KM Legends Race', 'fee': 'KES 500/-', 'width': 68},
    ]

    transport_schedule = [
        {'stop': 'Kencom', 'time': '6:00 AM'},
        {'stop': 'TRM', 'time': '6:30 AM'},
        {'stop': 'Kenyatta University', 'time': '5:00 AM'},
    ]

    tree_donation_schedule = [
        {'stop': 'Kencom', 'time': '4:00 AM'},
        {'stop': 'TRM', 'time': '4:30 AM'},
        {'stop': 'Kenyatta University', 'time': '5:00 AM'},
    ]

    sponsors = [
        'Nairobi Water',
        'Kenya Forest Service',
        'KEPRO',
        'Coca-Cola Foundation',
        'Kakuzi',
        'Kenya Jewel',
        'Favicon Media',
        'Spiro',
        'Subaru Kenya',
    ]

    context = {
        'info_items': info_items,
        'races': races,
        'transport_price': 'KES 1,500/-',
        'transport_schedule': transport_schedule,
        'tree_donation_price': 'KES 500/-',
        'tree_donation_schedule': tree_donation_schedule,
        'sponsors': sponsors,
    }
    return render(request, 'core/marathon.html', context)


def green_drive(request):
    """Nairobi Water Green Drive - Linda Kesho Leo programme page."""

    context = {}
    return render(request, 'core/green_drive.html', context)



@require_POST
def newsletter_subscribe(request):
    """Subscribe an email address to the MSV Mailchimp audience."""
    email = request.POST.get('email', '').strip()

    # Honeypot: real visitors never fill this hidden field in.
    if request.POST.get('website'):
        return JsonResponse({'status': 'error', 'message': 'Something went wrong.'}, status=400)

    if not email or '@' not in email:
        return JsonResponse(
            {'status': 'error', 'message': 'Please enter a valid email address.'}, status=400
        )

    api_key = settings.MAILCHIMP_API_KEY
    list_id = settings.MAILCHIMP_LIST_ID
    dc = settings.MAILCHIMP_DATA_CENTER

    if not (api_key and list_id and dc):
        return JsonResponse(
            {'status': 'error', 'message': 'Newsletter signup is not configured yet.'}, status=500
        )

    member_hash = hashlib.md5(email.lower().encode('utf-8')).hexdigest()
    url = f'https://{dc}.api.mailchimp.com/3.0/lists/{list_id}/members/{member_hash}'
    payload = {'email_address': email, 'status_if_new': 'subscribed', 'status': 'subscribed'}

    try:
        response = requests.put(url, auth=('anystring', api_key), json=payload, timeout=8)
    except requests.RequestException:
        return JsonResponse(
            {'status': 'error', 'message': 'Could not reach Mailchimp. Please try again shortly.'},
            status=502,
        )

    if response.status_code in (200, 201):
        _send_newsletter_welcome_email(request, email)
        return JsonResponse({'status': 'success', 'message': 'You\u2019re subscribed \u2014 thank you!'})
    
    try:
        detail = response.json()
    except ValueError:
        detail = {}

    title = detail.get('title', '')
    if title == 'Member Exists' or 'already a list member' in detail.get('detail', ''):
        return JsonResponse({'status': 'success', 'message': 'You\u2019re already on the list \u2014 thank you!'})

    if title in ('Invalid Resource', 'Forgotten Email Not Subscribed'):
        return JsonResponse(
            {'status': 'error', 'message': 'That email couldn\u2019t be added. Please check it and try again.'},
            status=400,
        )

    return JsonResponse({'status': 'error', 'message': 'Something went wrong. Please try again.'}, status=response.status_code)


def _send_newsletter_welcome_email(request, email):
    """Send a branded confirmation email to a new newsletter subscriber."""
    context = {
        'email': email,
        'site_url': request.build_absolute_uri('/'),
        'logo_url': request.build_absolute_uri(static('core/images/logo.png')),
    }
    html_body = render_to_string('core/emails/newsletter_welcome.html', context)
    text_body = strip_tags(html_body)

    message = EmailMultiAlternatives(
        subject='You\u2019re subscribed to MSV updates',
        body=text_body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[email],
    )
    message.attach_alternative(html_body, 'text/html')
    try:
        message.send(fail_silently=False)
    except Exception as exc:
        print('EMAIL SEND FAILED:', repr(exc))