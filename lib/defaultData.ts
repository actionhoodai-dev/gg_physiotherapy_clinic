import {
  ClinicSettings,
  HomepageCMS,
  ServiceItem,
  ConditionItem,
  TherapistItem,
  TestimonialItem,
  GalleryItem,
  BlogPostItem,
  FAQItem,
  SEOSettings,
} from '@/types';
import { googleReviews } from './googleReviews';

export const defaultSettings: ClinicSettings = {
  clinicName: 'GG Physiotherapy Clinic',
  tagline: 'Advanced Orthopedic & Neuro Rehabilitation in Perungudi, Chennai',
  logo: '/logo.svg',
  phone: '90940 26006',
  whatsapp: '+919094026006',
  email: 'contact@ggphysiotherapy.com',
  address: '22, 1st Main Rd, Phase-1, Thirumalai Nagar Annexe, Perungudi',
  area: 'Perungudi, OMR',
  city: 'Chennai',
  pincode: '600096',
  googleMapsUrl: 'https://maps.app.goo.gl/mdoRS4bubE7rfZhF8',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.1857795440815!2d80.23988167373162!3d12.95996101513605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d66f80c2b93%3A0x17341abd35988268!2sGG%20Physiotherapy%20Clinic(Dr.Sundaravalli%20jayakumar%20B.P.T%2CM.P.T(ORTHO)%2CDNT%2CMIAP!5e0!3m2!1sen!2sin!4v1788861434395!5m2!1sen!2sin',
  googleBusinessProfileUrl: 'https://maps.app.goo.gl/mdoRS4bubE7rfZhF8',
  googleReviewUrl: 'https://g.page/r/CWiCmDW9GjQXEBM/review',
  latitude: 12.959961,
  longitude: 80.239882,
  workingHours: {
    monSat: '10:00 am – 1:00 pm, 5:00 pm – 9:00 pm',
    sunday: '11:00 am – 1:00 pm',
    notes: 'Prior appointment recommended for comprehensive assessment.',
  },
  emergencyContact: '+91 90940 26006',
  socialLinks: {
    facebook: 'https://facebook.com/ggphysio',
    instagram: 'https://www.instagram.com/ggphysiotherapyclinic/',
    youtube: 'https://youtube.com',
  },
  appointmentSettings: {
    consultationFee: '₹500',
    allowClinic: true,
    allowHomeVisit: true,
    allowOnline: true,
    slotIntervalMinutes: 30,
  },
  whatsappTemplate: 'Hello GG Physiotherapy Clinic, I would like to book a physiotherapy consultation for [Service/Condition]. My preferred date is [Date].',
  updatedAt: new Date().toISOString(),
};

export const defaultHomepageCMS: HomepageCMS = {
  announcement: {
    text: 'Now accepting appointments for 1-Hour In-Clinic Physiotherapy Consultations in Perungudi, Chennai.',
    enabled: true,
    linkText: 'Book Slot',
    linkUrl: '/appointment',
  },
  hero: {
    badge: 'Premier Physiotherapy & Rehabilitation Center in Chennai',
    title: 'Restore Your Mobility. Live Without Pain.',
    highlightWord: 'Live Without Pain',
    subtitle: 'Led by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP), GG Physiotherapy provides evidence-based orthopedic, sports injury, and neuro rehabilitation in Perungudi, Chennai.',
    primaryCtaText: 'Book an Appointment',
    primaryCtaLink: '/appointment',
    secondaryCtaText: 'Call 90940 26006',
    secondaryCtaLink: 'tel:9094026006',
    heroImage: '/images/hero-cinematic.jpg',
    ratingNumber: 4.9,
    reviewCount: 312,
    experienceYears: 20,
    patientsTreated: '12,500+',
  },
  trustStats: [
    {
      label: 'Google Rating',
      value: '4.9 ★',
      description: 'Over 312+ verified reviews on Google Business',
    },
    {
      label: 'Clinical Experience',
      value: '20+ Years',
      description: 'Specialized Orthopedic & Neuro Rehabilitation',
    },
    {
      label: 'Patients Healed',
      value: '12,500+',
      description: 'Personalized recovery plans with lasting relief',
    },
    {
      label: 'Location Access',
      value: 'Perungudi, OMR',
      description: 'Convenient clinic with dedicated parking & lift',
    },
  ],
  aboutClinic: {
    badge: 'Meet Our Chief Specialist',
    title: 'Dedicated to Compassionate, Evidence-Driven Physical Care',
    subtitle: 'Under the leadership of Dr. Sundaravalli Jayakumar, we prioritize accurate root-cause diagnosis over temporary symptom masking.',
    paragraph1: 'GG Physiotherapy Clinic was established to deliver international standards of musculoskeletal and neurological physiotherapy to the residents and IT professionals of Perungudi, Thoraipakkam, Velachery, and the OMR corridor in Chennai.',
    paragraph2: 'We utilize a blend of advanced hands-on manual therapy, therapeutic modalities (IFT, TENS, Ultrasound, Traction), and customized exercise prescription to help you regain functional freedom and athletic performance.',
    bulletPoints: [
      'Comprehensive 1-on-1 functional movement assessment',
      'Personalized biomechanical rehabilitation protocols',
      'Advanced electrotherapy and spinal decompression tools',
      'Dedicated 1-hour in-clinic treatment slots with senior specialists',
    ],
    image: '/images/doctor-portrait.jpg',
    doctorName: 'Dr. Sundaravalli Jayakumar',
    doctorTitle: 'Founder & Chief Consultant Physiotherapist | FOMT (AUS), MSC Osteopathy & Dry Needle Therapist',
    doctorQualifications: 'B.P.T, M.P.T (ORTHO), DNT, MIAP, FOMT (AUS), MSC Osteopathy',
  },
  whyChooseUs: [
    {
      title: 'Orthopedic Specialization',
      description: 'Led by an M.P.T (Ortho) specialist trained in complex spinal, joint, and sports injuries.',
      icon: 'Activity',
    },
    {
      title: 'Individualized Treatment Plans',
      description: 'No one-size-fits-all routines. Every patient receives a tailored recovery regimen.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Cutting-Edge Modalities',
      description: 'Modern electrotherapy, ultrasound, traction, and deep tissue rehabilitation equipment.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Dedicated 1-Hour Slots',
      description: 'Zero waiting times at our Perungudi clinic with uninterrupted individual therapist attention.',
      icon: 'Clock',
    },
  ],
  treatmentProcess: [
    {
      step: 1,
      title: 'Clinical Assessment',
      description: 'Comprehensive evaluation of biomechanics, joint range, neural tension, and root pain drivers.',
    },
    {
      step: 2,
      title: 'Root-Cause Diagnosis',
      description: 'Precise clinical understanding and goal-setting shared transparently with you.',
    },
    {
      step: 3,
      title: 'Targeted Therapy',
      description: 'Hands-on manual joint mobilization, spinal decompression, and targeted modalities for acute relief.',
    },
    {
      step: 4,
      title: 'Progressive Rehabilitation',
      description: 'Supervised functional movement, core re-education, and resistance progression.',
    },
    {
      step: 5,
      title: 'Long-Term Prevention',
      description: 'Ergonomic optimization, posture maintenance, and independent home wellness protocols.',
    },
  ],
  finalCta: {
    title: 'Ready to Experience Lasting Relief from Pain?',
    subtitle: 'Book your consultation at GG Physiotherapy Clinic today. Convenient morning and evening slots available in Perungudi.',
    buttonText: 'Book Your Consultation',
    buttonLink: '/appointment',
  },
  updatedAt: new Date().toISOString(),
};

export const defaultServices: ServiceItem[] = [
  {
    id: 'orthopedic-rehab',
    title: 'Orthopedic Rehabilitation',
    slug: 'orthopedic-rehabilitation',
    shortDescription: 'Comprehensive care for bone, joint, ligament, and tendon disorders, helping you recover pain-free movement.',
    longDescription: 'Our Orthopedic Rehabilitation program is designed to treat both acute and chronic musculoskeletal conditions. From degenerative joint diseases like osteoarthritis to acute ligament sprains and tendonitis, our M.P.T (Ortho) led team delivers targeted manual therapy, joint mobilization, and strength reconditioning.',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Significant reduction in chronic joint pain & inflammation',
      'Restoration of full joint range of motion and flexibility',
      'Enhanced muscle strength around vulnerable joints',
      'Prevention of premature surgical interventions',
    ],
    treatmentApproach: 'We combine therapeutic ultrasound, interferential therapy (IFT), manual joint mobilization techniques, and targeted isometric/isotonic exercises tailored to your tolerance level.',
    suitableFor: [
      'Patients with knee, hip, or shoulder osteoarthritis',
      'Individuals recovering from fractures and cast removals',
      'People suffering from tennis elbow, golfer’s elbow, or plantar fasciitis',
      'Individuals with persistent tendon or ligament pain',
    ],
    durationInfo: '45 to 60 minutes per session. Recommended frequency: 2 to 4 sessions weekly depending on condition severity.',
    faqs: [
      {
        question: 'Do I need a doctor’s referral to start orthopedic physiotherapy?',
        answer: 'While referrals are welcome, our Chief Physiotherapist conducts a thorough initial evaluation and can begin your therapy program directly.',
      },
      {
        question: 'How many sessions will I need?',
        answer: 'Most acute conditions improve within 6 to 10 sessions, whereas chronic conditions may benefit from 12 to 15 sessions alongside a home exercise program.',
      },
    ],
    relatedConditions: ['knee-osteoarthritis', 'frozen-shoulder', 'plantar-fasciitis'],
    relatedServices: ['spine-back-pain-care', 'sports-injury-rehab'],
    seoTitle: 'Orthopedic Physiotherapy in Perungudi, Chennai | GG Physio',
    seoDescription: 'Expert orthopedic rehabilitation for arthritis, joint pain, fractures, and ligament injuries by Dr. Sundaravalli Jayakumar in Perungudi, Chennai.',
    published: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'spine-back-care',
    title: 'Spine & Back Pain Care',
    slug: 'spine-back-pain-care',
    shortDescription: 'Evidence-based relief for lower back pain, sciatica, herniated discs, and cervical neck stiffness.',
    longDescription: 'Back and neck pain are among the most common ailments affecting Chennai’s working professionals and seniors. At GG Physiotherapy, we identify the exact mechanical issue—disc compression, nerve impingement, or muscular imbalance—and use spinal traction, manual release, and core stabilization to provide lasting relief.',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Decompression of impinged nerve roots and sciatica relief',
      'Restoration of natural spinal curvature and posture',
      'Core musculature strengthening to prevent future relapses',
      'Practical ergonomics training for desk workers',
    ],
    treatmentApproach: 'Mechanical lumbar/cervical traction, electrical nerve stimulation, McKenzie extension therapy, dry needling/acupressure points where applicable, and core stability training.',
    suitableFor: [
      'Tech professionals experiencing long sitting hours & lower back fatigue',
      'Patients with MRI-confirmed disc bulge, prolapse, or sciatica',
      'Individuals with cervical spondylosis and radiating arm pain',
      'Postural thoracic kyphosis and text-neck syndrome',
    ],
    durationInfo: '45 to 60 minutes. Usually 10 to 12 sessions for significant disc-related relief.',
    faqs: [
      {
        question: 'Can physiotherapy help avoid spine surgery?',
        answer: 'Yes! Clinical research shows that over 85% of disc bulges and sciatica cases resolve effectively with conservative physiotherapy without surgery.',
      },
    ],
    relatedConditions: ['low-back-pain-sciatica', 'cervical-spondylosis'],
    relatedServices: ['orthopedic-rehabilitation', 'post-surgical-rehab'],
    seoTitle: 'Back Pain & Sciatica Treatment in Perungudi Chennai | GG Physio',
    seoDescription: 'Relieve chronic back ache, herniated disc pain, and sciatica with specialized spine physiotherapy in Perungudi, OMR Chennai.',
    published: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sports-injury-rehab',
    title: 'Sports Injury Rehabilitation',
    slug: 'sports-injury-rehab',
    shortDescription: 'Accelerated recovery protocols for athletes, runners, and weekend warriors to return to peak performance.',
    longDescription: 'Whether you suffered an ankle sprain on the badminton court or a rotator cuff injury in the gym, our sports rehabilitation protocols are engineered to heal tissues, restore neuromuscular control, and return you safely to play without re-injury.',
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Accelerated tissue repair and scar tissue remodelling',
      'Proprioception and balance restoration',
      'Sport-specific agility and power drills',
      'Injury prevention biomechanics evaluation',
    ],
    treatmentApproach: 'Kinetic taping, cryo-compression, eccentric loading, plyometrics, functional movement screen (FMS), and guided return-to-sport testing.',
    suitableFor: [
      'Runners, badminton, cricket, football, and tennis players',
      'Gym enthusiasts with shoulder impingement or lower back strain',
      'Athletes recovering from ACL/meniscal repairs',
    ],
    durationInfo: '60 minutes per session. Tailored periodized training program.',
    faqs: [
      {
        question: 'When can I resume sports after an injury?',
        answer: 'Return-to-sport timelines depend on functional criteria: full painless range of motion, at least 90% limb symmetry strength, and passing agility tests.',
      },
    ],
    relatedConditions: ['knee-osteoarthritis', 'plantar-fasciitis'],
    relatedServices: ['orthopedic-rehabilitation'],
    seoTitle: 'Sports Physiotherapy in Chennai | GG Physiotherapy Clinic',
    seoDescription: 'Sports injury rehabilitation for runners, athletes, and fitness enthusiasts in Perungudi, OMR Chennai. Fast & safe return to play.',
    published: true,
    displayOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'neuro-rehab',
    title: 'Neuro Rehabilitation',
    slug: 'neuro-rehabilitation',
    shortDescription: 'Specialized therapy for stroke recovery, Parkinson’s disease, facial palsy, and neurological conditions.',
    longDescription: 'Guided by Dr. Sundaravalli’s qualification in Neuro Therapy (DNT), our neurological rehabilitation leverages neuroplasticity to rebuild motor control, re-educate sensory pathways, and maximize functional independence for neurological patients.',
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Retraining gait, balance, and coordination',
      'Reduction of muscle spasticity and contracture prevention',
      'Empowerment with activities of daily living (ADLs)',
      'Caregiver education on safe transfers and home mobility',
    ],
    treatmentApproach: 'Bobath neuro-developmental therapy, task-oriented gait training, functional electrical stimulation (FES), and balance platform exercises.',
    suitableFor: [
      'Post-stroke hemiplegia and hemiparesis patients',
      'Individuals with Parkinson’s disease and movement tremors',
      'Patients recovering from Bell’s palsy or facial nerve weakness',
      'Peripheral neuropathy and balance deficits',
    ],
    durationInfo: '60 minutes dedicated in-clinic session.',
    faqs: [
      {
        question: 'How does neuro-rehabilitation therapy work at your clinic?',
        answer: 'We provide structured 1-on-1 neuro-developmental therapy, gait retraining, and functional electrical stimulation at our Perungudi clinic to safely rebuild motor control and walking independence.',
      },
    ],
    relatedConditions: ['low-back-pain-sciatica'],
    relatedServices: ['post-surgical-rehab', 'geriatric-physiotherapy'],
    seoTitle: 'Stroke & Neuro Physiotherapy in Perungudi Chennai | GG Physio',
    seoDescription: 'Compassionate neuro rehabilitation for stroke recovery, paralysis, Bell’s palsy, and Parkinson’s disease at our Perungudi clinic in Chennai.',
    published: true,
    displayOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'post-surgical-rehab',
    title: 'Post-Surgical Rehabilitation',
    slug: 'post-surgical-rehab',
    shortDescription: 'Structured protocols after total knee replacement, hip surgery, and spinal fixation.',
    longDescription: 'Successful surgical outcomes depend heavily on timely and disciplined post-operative physiotherapy. We collaborate closely with orthopedic surgeons to guide patients safely through inflammatory, reparative, and remodelling phases.',
    heroImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Prevention of post-surgical adhesions and joint stiffness',
      'Safe weight-bearing progression from walker to independent walking',
      'Swelling control via manual lymphatic drainage and cryotherapy',
      'Complete regaining of knee flexion and extension',
    ],
    treatmentApproach: 'Continuous passive motion principles, gentle manual patellar mobilization, progressive resistive exercises, and gait retraining.',
    suitableFor: [
      'Total Knee Replacement (TKR) and Total Hip Replacement (THR) patients',
      'Post-arthroscopic ACL/meniscal repair patients',
      'Post-spine discectomy or laminectomy patients',
    ],
    durationInfo: '45 to 60 minutes. Usually 3 to 6 weeks of structured therapy.',
    faqs: [
      {
        question: 'How soon after knee replacement surgery should physiotherapy begin?',
        answer: 'Gentle bed exercises typically begin in the hospital, and structured outpatient in-clinic physiotherapy at our Perungudi center starts as soon as you are discharged to restore joint range and walking confidence.',
      },
    ],
    relatedConditions: ['knee-osteoarthritis'],
    relatedServices: ['orthopedic-rehabilitation', 'geriatric-physiotherapy'],
    seoTitle: 'Post-Operative Physiotherapy in Chennai | GG Physio',
    seoDescription: 'Post-surgical rehabilitation for knee replacement, hip replacement, and spine surgeries in Perungudi Chennai with specialized in-clinic therapy.',
    published: true,
    displayOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'geriatric-physio',
    title: 'Geriatric Physiotherapy & Fall Prevention',
    slug: 'geriatric-physiotherapy',
    shortDescription: 'Enhancing mobility, balance, joint comfort, and independence for elderly citizens.',
    longDescription: 'Age should never be a barrier to pain-free movement. Our senior care physiotherapy focuses on enhancing joint comfort, strengthening postural stabilizers, improving bone mineral density support, and reducing the risk of catastrophic falls.',
    heroImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    benefits: [
      'Greater independence in daily transfers, stairs, and walking',
      'Significant reduction in fall risk and fear of falling',
      'Gentle relief from generalized arthritis and stiffness',
      'Cardiopulmonary endurance enhancement',
    ],
    treatmentApproach: 'Low-impact therapeutic movements, balance and vestibular coordination, gentle stretching, and heat therapy.',
    suitableFor: [
      'Seniors with unsteadiness, dizziness, or history of falls',
      'Elderly individuals with severe arthritis or osteoporosis',
      'Seniors looking to maintain independent living at home',
    ],
    durationInfo: '45 minutes. Calm, patient-paced sessions.',
    faqs: [
      {
        question: 'Is physiotherapy safe for elderly patients with osteoporosis?',
        answer: 'Yes. We strictly employ gentle, weight-bearing, non-rotational protocols that strengthen bones and muscles safely without strain.',
      },
    ],
    relatedConditions: ['knee-osteoarthritis'],
    relatedServices: ['orthopedic-rehabilitation', 'neuro-rehabilitation'],
    seoTitle: 'Geriatric Physiotherapy in Perungudi Chennai | GG Physio',
    seoDescription: 'Senior citizen physiotherapy and fall prevention in Chennai. Gentle mobility and balance training at our clinic or in the comfort of home.',
    published: true,
    displayOrder: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultConditions: ConditionItem[] = [
  {
    id: 'low-back-pain-sciatica',
    title: 'Low Back Pain & Sciatica',
    slug: 'low-back-pain-sciatica',
    shortDescription: 'Sharp or dull lumbar pain, radiating down the hip, thigh, or calf due to nerve compression.',
    detailedContent: 'Low back pain is the leading cause of disability worldwide. Sciatica occurs when the sciatic nerve—running from the lower back through the hips and down each leg—becomes compressed or inflamed, typically by a herniated lumbar disc (L4-L5, L5-S1) or bone spur.',
    symptoms: [
      'Burning or shooting pain travelling down the buttock into the leg',
      'Numbness, tingling, or weakness in the foot or toes',
      'Difficulty standing straight or prolonged sitting',
      'Morning stiffness in the lumbar region',
    ],
    treatmentApproach: 'We utilize lumbar mechanical traction to relieve disc compression, targeted McKenzie spinal extensions to centralize pain, electrical stimulation for nerve healing, and deep core strengthening (Transverse Abdominis & Multifidus activation).',
    whenToSeekHelp: 'Seek immediate care if you experience progressive leg weakness, numbness in the groin/saddle area, or bladder/bowel difficulty.',
    relatedServices: ['spine-back-pain-care', 'orthopedic-rehabilitation'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'How fast can I get relief from sciatica pain?',
        answer: 'Most patients notice meaningful pain reduction within 3 to 5 therapy sessions as nerve compression is relieved.',
      },
    ],
    seoTitle: 'Low Back Pain & Sciatica Treatment in Perungudi, Chennai',
    seoDescription: 'Non-surgical relief for low back pain, disc bulge, and sciatica at GG Physiotherapy Clinic, Perungudi, Chennai.',
    published: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'knee-osteoarthritis',
    title: 'Knee Osteoarthritis',
    slug: 'knee-osteoarthritis',
    shortDescription: 'Degeneration of knee joint cartilage leading to pain, grinding sensations, and difficulty climbing stairs.',
    detailedContent: 'Osteoarthritis of the knee is a degenerative wear-and-tear condition where protective joint cartilage wears away. Without proper physical therapy, surrounding muscles weaken, accelerating joint erosion and restricting mobility.',
    symptoms: [
      'Pain when standing up from a chair or climbing stairs',
      'Grinding or creaking sounds (crepitus) inside the knee joint',
      'Joint stiffness after waking up or long periods of rest',
      'Swelling or tenderness around the knee cap',
    ],
    treatmentApproach: 'Quadriceps and hamstring strengthening, gentle joint distraction, ultrasound/IFT to alleviate swelling, and gait realignment with supportive footwear advice.',
    whenToSeekHelp: 'Consult us when knee pain begins limiting your daily walking or requiring frequent painkiller usage.',
    relatedServices: ['orthopedic-rehabilitation', 'geriatric-physiotherapy'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'Can physiotherapy delay or prevent knee replacement surgery?',
        answer: 'Yes! Strengthening stabilizing knee muscles relieves pressure from worn joint cartilage, often delaying or eliminating the need for joint replacement.',
      },
    ],
    seoTitle: 'Knee Osteoarthritis Physiotherapy in Perungudi Chennai',
    seoDescription: 'Effective non-invasive therapy for knee arthritis and stiffness in Perungudi, Chennai by Dr. Sundaravalli Jayakumar.',
    published: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cervical-spondylosis',
    title: 'Cervical Spondylosis & Neck Pain',
    slug: 'cervical-spondylosis',
    shortDescription: 'Neck pain, shoulder tension, and tingling in fingers caused by posture strain or cervical disc wear.',
    detailedContent: 'Cervical spondylosis affects the discs and vertebrae of the neck. With long hours on laptops and smartphones (often called "Tech Neck"), neck muscles suffer chronic strain, leading to headache, vertigo, and radiating arm pain.',
    symptoms: [
      'Stiffness and pain when turning the neck',
      'Tension headaches originating at the base of the skull',
      'Tingling, numbness, or weakness in the shoulder, arm, or fingers',
      'Dizziness or unsteady sensation on sudden head turns',
    ],
    treatmentApproach: 'Gentle cervical mobilization, posture restoration, deep neck flexor retraining, ergonomic adjustments, and soothing electro-therapy.',
    whenToSeekHelp: 'Seek prompt assessment if pain radiates down both arms or you experience unsteadiness.',
    relatedServices: ['spine-back-pain-care'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'Can ergonomic changes at work help my neck pain?',
        answer: 'Absolutely. Adjusting monitor height, chair lumbar support, and taking micro-breaks are essential parts of our comprehensive treatment.',
      },
    ],
    seoTitle: 'Cervical Spondylosis & Neck Pain Treatment Perungudi Chennai',
    seoDescription: 'Treat neck pain, cervical spondylosis, and tech-neck in Perungudi, OMR Chennai at GG Physiotherapy Clinic.',
    published: true,
    displayOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'frozen-shoulder',
    title: 'Frozen Shoulder (Adhesive Capsulitis)',
    slug: 'frozen-shoulder',
    shortDescription: 'Severe stiffness and pain in the shoulder joint that severely restricts arm elevation and rotation.',
    detailedContent: 'Frozen shoulder occurs when the connective tissue capsule surrounding the shoulder joint thickens and tightens. It typically progresses through freezing, frozen, and thawing stages, often affecting individuals with diabetes or post-injury immobilization.',
    symptoms: [
      'Inability to reach behind your back or lift arm overhead',
      'Dull aching pain that worsens during sleep',
      'Shoulder joint feeling locked or rigidly restricted',
    ],
    treatmentApproach: 'Targeted capsular stretches, Maitland joint mobilization, heat therapy, and progressive range-of-motion drills.',
    whenToSeekHelp: 'Earlier intervention yields much faster recovery before severe joint adhesions solidify.',
    relatedServices: ['orthopedic-rehabilitation'],
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'How long does frozen shoulder take to heal with physiotherapy?',
        answer: 'With structured weekly mobilization and home stretching, noticeable movement gains occur in 4 to 8 weeks.',
      },
    ],
    seoTitle: 'Frozen Shoulder Treatment in Perungudi, Chennai | GG Physio',
    seoDescription: 'Restore full shoulder mobility and stop sleep pain from frozen shoulder with advanced physiotherapy in Chennai.',
    published: true,
    displayOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'plantar-fasciitis',
    title: 'Plantar Fasciitis & Heel Pain',
    slug: 'plantar-fasciitis',
    shortDescription: 'Intense heel pain during the first few morning steps caused by inflammation of the plantar fascia.',
    detailedContent: 'The plantar fascia is a thick band of tissue running across the bottom of the foot connecting heel to toes. Excessive standing, sudden running mileage increases, or improper footwear can cause micro-tears and chronic heel pain.',
    symptoms: [
      'Stabbing heel pain with the very first steps in the morning',
      'Heel pain after prolonged standing or walking on hard floors',
      'Tightness in the Achilles tendon and calf muscles',
    ],
    treatmentApproach: 'Ultrasound therapy, deep calf and fascia release, custom arch support guidance, and eccentric calf loading.',
    whenToSeekHelp: 'Seek treatment if heel pain lasts more than a week or alters your walking pattern.',
    relatedServices: ['orthopedic-rehabilitation', 'sports-injury-rehab'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    faqs: [
      {
        question: 'What footwear is best for plantar fasciitis?',
        answer: 'We recommend cushioned footwear with good arch support and a slight heel lift; avoid walking barefoot on hard tile floors.',
      },
    ],
    seoTitle: 'Plantar Fasciitis Heel Pain Relief Perungudi Chennai',
    seoDescription: 'Say goodbye to morning heel pain and plantar fasciitis with expert foot therapy in Perungudi, Chennai.',
    published: true,
    displayOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultTherapists: TherapistItem[] = [
  {
    id: 'dr-sundaravalli-jayakumar',
    name: 'Dr. Sundaravalli Jayakumar',
    designation: 'Founder & Chief Consultant Physiotherapist | FOMT (AUS), MSC Osteopathy & Dry Needle Therapist',
    qualification: 'B.P.T, M.P.T (ORTHO), DNT, MIAP, FOMT (AUS), MSC Osteopathy',
    yearsOfExperience: 20,
    specialization: [
      'Orthopedic & Musculoskeletal Rehabilitation',
      'Osteopathy & Manual Therapy (FOMT (AUS), MSC Osteopathy)',
      'Dry Needling Therapy (DNT)',
      'Spine Care & Non-Surgical Disc Decompression',
      'Neuro Rehabilitation & Stroke Recovery',
      'Sports Injury Reconditioning',
      'Post-Operative TKR & THR Care',
    ],
    biography: 'Dr. Sundaravalli Jayakumar is an esteemed consultant physiotherapist, MSC Osteopathy and dry needling specialist based in Perungudi, Chennai. With a Master’s degree in Orthopedic Physiotherapy (M.P.T ORTHO), Fellowship in Orthopedic Manual Therapy (FOMT AUS), MSC Osteopathy, and specialized Diploma in Neuro Therapy (DNT), she brings over 20 years of focused clinical experience. As an active Member of the Indian Association of Physiotherapists (MIAP), Dr. Sundaravalli has successfully treated over 12,500 patients suffering from severe back pain, knee arthritis, sciatica, and neurological disorders through personalized, hands-on evidence-based care.',
    profileImage: '/images/doctor-portrait.jpg',
    languages: ['Tamil', 'English'],
    socialLinks: {
      linkedin: 'https://linkedin.com',
    },
    displayOrder: 1,
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultTestimonials: TestimonialItem[] = googleReviews;

export const defaultGallery: GalleryItem[] = [];

export const defaultBlogPosts: BlogPostItem[] = [
  {
    id: 'prevent-desk-back-pain-chennai',
    title: '5 Ergonomic Rules to Prevent Back Pain for IT Workers in OMR Chennai',
    slug: 'prevent-desk-back-pain-omr-chennai',
    excerpt: 'Prolonged sitting at desks without dynamic posture breaks is the primary culprit behind lower back and neck strain in Chennai’s tech professionals.',
    content: `## The Reality of Desk-Bound Strain in Chennai's Tech Corridor

With the average software developer and tech worker in Perungudi and OMR spending 9 to 11 hours seated before monitors, lumbar disc compression and neck stiffness have reached an all-time high.

### 1. The 90-90 Rule for Hip and Knee Alignment
Ensure your hips and knees rest at approximately 90 degrees with both feet flat on the floor. Avoid crossing your legs or perching your feet on chair caster wheels, as this tilts your pelvis and strains the sacroiliac joint.

### 2. Screen Height at Eye Level
The top third of your computer screen must align directly with your horizontal eye gaze. Looking downward even by 15 degrees multiplies the effective weight of your head on the cervical spine from 5 kg to nearly 15 kg.

### 3. Take a 2-Minute Micro-Break Every 45 Minutes
Set a gentle timer. Stand up, extend your lower back backwards with your hands on your hips (the classic McKenzie extension), roll your shoulders, and take deep diaphragmatic breaths.

### 4. Hydrate to Re-Hydrate Your Spinal Discs
Intervertebral discs are largely fluid. Adequate hydration throughout the workday sustains their shock-absorbing capabilities.

### 5. When to Seek Professional Assessment
If back pain radiates past your glutes into your legs or numbness develops in your feet, do not wait. Early physical therapy avoids structural disc herniation.`,
    featuredImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Sundaravalli Jayakumar',
    category: 'Ergonomics',
    tags: ['Back Pain', 'Ergonomics', 'OMR Chennai', 'Posture'],
    seoTitle: '5 Ergonomic Tips for Tech Workers in Chennai | GG Physio',
    metaDescription: 'Practical tips to avoid back and neck pain while working long desk hours in Chennai, by Dr. Sundaravalli Jayakumar.',
    published: true,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'knee-pain-walking-tips',
    title: 'Knee Pain While Climbing Stairs? Causes and Safe Exercises',
    slug: 'knee-pain-climbing-stairs-exercises',
    excerpt: 'Why climbing stairs causes sharp knee pain, and how targeted quadriceps strengthening can protect your cartilage.',
    content: `## Understanding Patellofemoral & Osteoarthritic Knee Pain

Climbing stairs places up to 3 to 4 times your body weight across the patellofemoral joint. When surrounding muscles are weak or joint cartilage is worn, this load causes sharp pain and inflammation.

### Why Rest Alone Does Not Heal Knee Pain
Many patients believe resting will cure knee pain. However, immobilization causes the quadriceps (the main shock absorber of the knee) to atrophy rapidly, placing even greater force onto the joint once walking resumes.

### Safe Home Exercises:
- **Straight Leg Raises**: Lie flat on your back and raise one leg to 45 degrees, holding for 5 seconds to build quad strength without bending the knee joint.
- **Hamstring Stretches**: Keeps the back of the leg supple, reducing shear stress across the patella.
- **Calf Raises**: Strengthens ankle stability to assist with stairs.

Consult with a physiotherapist for a personalized evaluation before undertaking high-impact exercises.`,
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    author: 'Dr. Sundaravalli Jayakumar',
    category: 'Joint Health',
    tags: ['Knee Pain', 'Osteoarthritis', 'Exercises'],
    seoTitle: 'Knee Pain on Stairs? Causes & Physiotherapy in Chennai',
    metaDescription: 'Learn why knee pain flares when climbing stairs and how targeted physical therapy protects your knees.',
    published: true,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const defaultFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Where is GG Physiotherapy Clinic located?',
    answer: 'We are conveniently located at No. 22, 1st Main Rd, Phase-1, Thirumalai Nagar Annexe, Perungudi, Chennai 600096, easily accessible from OMR, Velachery, and Thoraipakkam with dedicated parking.',
    category: 'General',
    displayOrder: 1,
    published: true,
  },
  {
    id: 'faq-2',
    question: 'What are the clinic consultation hours?',
    answer: 'We are open Monday to Saturday from 10:00 am to 1:00 pm (morning slot) and 5:00 pm to 9:00 pm (evening slot). On Sundays, we are open from 11:00 am to 1:00 pm.',
    category: 'Appointments',
    displayOrder: 2,
    published: true,
  },
  {
    id: 'faq-3',
    question: 'How are appointment slots organized at the clinic?',
    answer: 'We schedule dedicated 1-hour in-clinic consultation slots so each patient receives uninterrupted, one-on-one attention with Dr. Sundaravalli Jayakumar and our senior physical therapists, guaranteeing zero waiting times.',
    category: 'Appointments',
    displayOrder: 3,
    published: true,
  },
  {
    id: 'faq-4',
    question: 'How do I book an appointment?',
    answer: 'You can book directly via our website booking form, call us at 90940 26006, or send a quick message to our clinic WhatsApp (+91 90940 26006). Our clinic team will confirm your preferred time slot immediately.',
    category: 'Appointments',
    displayOrder: 4,
    published: true,
  },
  {
    id: 'faq-5',
    question: 'What qualifications does Dr. Sundaravalli have?',
    answer: 'Dr. Sundaravalli Jayakumar holds B.P.T, M.P.T (Orthopedics), Diploma in Neuro Therapy (DNT), FOMT (AUS), MSC Osteopathy, and specialized certification in Dry Needling, and is an accredited Member of the Indian Association of Physiotherapists (MIAP) with over 20 years of clinical practice.',
    category: 'Doctor',
    displayOrder: 5,
    published: true,
  },
  {
    id: 'faq-6',
    question: 'What should I wear for my physiotherapy session?',
    answer: 'Please wear comfortable, loose-fitting clothing (such as track pants or shorts and a t-shirt) that allows easy movement and direct access to the area being examined (e.g. knee, shoulder, back).',
    category: 'Treatment',
    displayOrder: 6,
    published: true,
  },
];

export const defaultSEOSettings: SEOSettings = {
  defaultTitle: 'GG Physiotherapy Clinic | Best Physiotherapist in Perungudi, Chennai',
  titleTemplate: '%s | GG Physiotherapy Clinic Chennai',
  defaultDescription: 'Premier physiotherapy clinic in Perungudi, Chennai led by Dr. Sundaravalli Jayakumar (B.P.T, M.P.T ORTHO, DNT, MIAP). 4.9★ rated care for back pain, sciatica, knee arthritis, sports injury, and neuro rehabilitation.',
  keywords: [
    'physiotherapy in perungudi',
    'physiotherapy clinic in chennai',
    'physiotherapist near me',
    'dr sundaravalli jayakumar',
    'orthopedic physiotherapy chennai',
    'back pain treatment perungudi',
    'sciatica pain relief chennai',
    'sports physiotherapy omr chennai',
    'in-clinic physiotherapy perungudi chennai',
    'stroke rehabilitation perungudi',
    'knee pain physiotherapy chennai',
  ],
  canonicalBase: 'https://ggphysiotherapy.com',
  ogImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  localAreaTargeting: [
    'Perungudi',
    'OMR Chennai',
    'Thoraipakkam',
    'Velachery',
    'Kandanchavadi',
    'Taramani',
    'Palavakkam',
    'Madipakkam',
  ],
};
